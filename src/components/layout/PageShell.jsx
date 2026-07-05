import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from './PageShell.module.css';

/**
 * Global page chrome: skip-link, Header, main landmark, Footer.
 * Every route renders inside this shell (wired in App.jsx).
 */
export default function PageShell({ children }) {
  // Focus <main> explicitly: not every browser moves focus on a same-page
  // anchor jump (Safari never does), and the hash-only history update would
  // otherwise leave focus on the link.
  const skipToContent = (event) => {
    event.preventDefault();
    const main = document.getElementById('inhalt');
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#inhalt" onClick={skipToContent}>
        Zum Inhalt springen
      </a>
      <Header />
      {/* tabIndex -1 so the skip-link target reliably receives focus */}
      <main id="inhalt" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
