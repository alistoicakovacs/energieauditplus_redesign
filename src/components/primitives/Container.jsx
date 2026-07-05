import styles from './Container.module.css';

/**
 * Horizontal layout container.
 * @param {object} props
 * @param {'default'|'wide'} [props.width]  default 1280px, wide 1440px
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function Container({ width = 'default', as: Tag = 'div', className = '', children, ...rest }) {
  const classes = [styles.container, width === 'wide' ? styles.wide : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
