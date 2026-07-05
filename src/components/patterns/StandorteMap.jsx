import styles from './StandorteMap.module.css';

/**
 * StandorteMap — static, self-hosted Germany map (simplified outline SVG,
 * no external tiles/requests — plan §6.1.11 explicitly forbids Google Maps)
 * with one dot per Standort. Locations are passed with real WGS84
 * coordinates and projected with a simple equirectangular projection
 * (longitude compressed by cos(51°)), so dots always land in the right
 * region of the stylized outline.
 *
 * A11y: rendered as `role="img"` with a German aria-label naming every
 * location; the dots themselves are decorative (`aria-hidden`). Pages
 * should pair the map with a textual list of the Standorte.
 *
 * @param {object} props
 * @param {{name: string, lat: number, lon: number, partner?: boolean}[]} props.locations
 * @param {string} [props.label] German alternative text override.
 * @param {string} [props.className]
 */

/* Simplified Germany border, clockwise from the Danish border (WGS84).
   Hand-simplified for a clean, calm outline — not a geodataset. */
const OUTLINE = [
  [55.05, 8.4], [54.88, 8.62], [54.9, 9.6], [54.8, 9.95], [54.55, 10.0],
  [54.35, 10.65], [54.4, 11.1], [54.0, 10.8], [53.95, 11.2], [54.18, 12.1],
  [54.45, 12.6], [54.35, 13.05], [54.65, 13.35], [54.55, 13.7], [54.3, 13.7],
  [54.05, 13.9], [53.85, 14.1], [53.9, 14.25], [53.55, 14.35], [53.05, 14.35],
  [52.85, 14.15], [52.55, 14.63], [52.1, 14.72], [51.8, 14.62], [51.5, 14.95],
  [51.16, 15.02], [50.87, 14.82], [51.0, 14.3], [50.8, 13.95], [50.62, 13.5],
  [50.42, 12.98], [50.18, 12.32], [50.32, 12.1], [50.08, 12.22], [49.75, 12.45],
  [49.35, 12.75], [48.97, 13.42], [48.77, 13.82], [48.56, 13.44], [48.28, 13.0],
  [47.9, 12.93], [47.72, 13.02], [47.63, 12.2], [47.55, 11.27], [47.4, 10.9],
  [47.27, 10.18], [47.55, 9.75], [47.66, 9.18], [47.56, 8.58], [47.58, 7.59],
  [48.32, 7.68], [48.97, 8.22], [49.2, 7.4], [49.47, 6.37], [49.8, 6.13],
  [50.13, 6.14], [50.35, 6.4], [50.75, 6.01], [51.05, 5.87], [51.4, 6.22],
  [51.83, 5.96], [51.9, 6.16], [52.23, 7.0], [52.45, 6.98], [52.65, 7.05],
  [53.0, 7.19], [53.24, 7.21], [53.33, 7.0], [53.6, 7.1], [53.7, 8.03],
  [53.55, 8.55], [53.85, 8.7], [53.9, 9.0], [54.3, 8.6], [54.75, 8.55],
];

/* Equirectangular projection into the viewBox (lon shrunk by cos ~51°). */
const PAD = 12;
const KX = 62.5;
const KY = 100;
const MIN_LON = 5.8;
const MAX_LAT = 55.1;
const project = ([lat, lon]) => [
  PAD + (lon - MIN_LON) * KX,
  PAD + (MAX_LAT - lat) * KY,
];
const VIEW_W = Math.round(PAD * 2 + (15.05 - MIN_LON) * KX);
const VIEW_H = Math.round(PAD * 2 + (MAX_LAT - 47.27) * KY);

const OUTLINE_PATH = `M${OUTLINE.map((p) =>
  project(p)
    .map((v) => v.toFixed(1))
    .join(' ')
).join('L')}Z`;

export default function StandorteMap({ locations = [], label, className = '', ...rest }) {
  const classes = [styles.map, className].filter(Boolean).join(' ');
  const altText =
    label ??
    `Deutschlandkarte mit unseren Standorten: ${locations
      .map((l) => (l.partner ? `${l.name} (Partner)` : l.name))
      .join(', ')}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={altText}
      className={classes}
      {...rest}
    >
      <path d={OUTLINE_PATH} className={styles.outline} />
      <g aria-hidden="true">
        {locations.map((location) => {
          const [x, y] = project([location.lat, location.lon]);
          return (
            <circle
              key={location.name}
              cx={x.toFixed(1)}
              cy={y.toFixed(1)}
              r={location.partner ? 9 : 11}
              className={location.partner ? styles.dotPartner : styles.dot}
            />
          );
        })}
      </g>
    </svg>
  );
}
