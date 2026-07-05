import styles from './Section.module.css';

/**
 * Vertical page section — owns rhythm (128px desktop / 64px mobile) and background.
 * @param {object} props
 * @param {'white'|'subtle'|'blue-tint'|'eco-tint'|'dark'} [props.background]
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
const backgroundClass = {
  white: styles.white,
  subtle: styles.subtle,
  'blue-tint': styles.blueTint,
  'eco-tint': styles.ecoTint,
  dark: styles.dark,
};

export default function Section({ background = 'white', as: Tag = 'section', className = '', children, ...rest }) {
  const classes = [styles.section, backgroundClass[background] ?? styles.white, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
