/**
 * In-memory sliding-window rate limiter (plan §8.1: "e.g. 5 req/h per IP …
 * in-memory LRU is acceptable for v1 with a documented caveat that it's
 * per-instance").
 *
 * DOCUMENTED LIMITATION (v1): the window state lives in this process's memory.
 * On a serverless host (Vercel/Netlify) each cold instance has its own map, so
 * the real ceiling is `max × concurrentInstances`, and the counter resets on
 * every redeploy/scale event. This is a deliberate spam-friction measure, not
 * a hard security boundary — escalate to a shared store (Upstash/Redis) or an
 * edge middleware limiter if abuse volume demands it.
 *
 * Bounded memory: at most `maxEntries` IPs are tracked (LRU eviction), so a
 * spray of unique source IPs cannot grow the map without bound.
 */

/**
 * @param {object} [opts]
 * @param {number} [opts.max=5]          Allowed requests per window per IP.
 * @param {number} [opts.windowMs=3600000] Window length (default 1h).
 * @param {number} [opts.maxEntries=5000] Max distinct IPs tracked (LRU cap).
 */
export function createRateLimiter({ max = 5, windowMs = 60 * 60 * 1000, maxEntries = 5000 } = {}) {
  /** @type {Map<string, number[]>} insertion-ordered → doubles as LRU. */
  const hits = new Map();

  return {
    /**
     * Record a request from `ip` at `now` and report whether it is allowed.
     * @param {string} ip
     * @param {number} [now=Date.now()]
     * @returns {{ allowed: boolean, remaining: number, retryAfterMs: number }}
     */
    check(ip, now = Date.now()) {
      const key = ip || 'unknown';
      const cutoff = now - windowMs;

      const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);

      // Allowed only while fewer than `max` hits fall inside the window. Store
      // ONLY allowed hits, so a sustained flood from one IP cannot grow the
      // array past `max` (previously every over-limit request was still
      // pushed → unbounded array + O(n) filter per call → quadratic DoS).
      const allowed = recent.length < max;
      if (allowed) recent.push(now);

      // Refresh LRU recency: delete + re-set moves the key to the tail.
      hits.delete(key);
      hits.set(key, recent);

      // Evict least-recently-used entries beyond the cap.
      while (hits.size > maxEntries) {
        const oldest = hits.keys().next().value;
        hits.delete(oldest);
      }

      const retryAfterMs = allowed ? 0 : Math.max(0, recent[0] + windowMs - now);
      return { allowed, remaining: Math.max(0, max - recent.length), retryAfterMs };
    },

    /** Test/introspection helper — number of timestamps currently stored for an IP. */
    size(ip) {
      return (hits.get(ip || 'unknown') ?? []).length;
    },

    /** Test helper — wipe all tracked state. */
    reset() {
      hits.clear();
    },
  };
}
