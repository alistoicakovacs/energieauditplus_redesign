import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

const MotionRouterLink = motion.create(RouterLink);

const hoverSpring = { type: 'spring', stiffness: 400, damping: 24 };

const buttonVariants = {
  rest: { y: 0 },
  hover: { y: -2 },
  press: { y: 0, scale: 0.98 },
};

const iconNudge = {
  rest: { x: 0 },
  hover: { x: 3 },
};

/**
 * The one button for every clickable action on the site.
 *
 * @param {object} props
 * @param {'primary'|'accent'|'outline'|'ghost'|'onDark'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {import('react').ComponentType} [props.icon]  Lucide icon component
 * @param {'left'|'right'} [props.iconPosition]
 * @param {string} [props.to]    renders a router link
 * @param {string} [props.href]  renders an anchor
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    to,
    href,
    loading = false,
    disabled = false,
    type = 'button',
    className = '',
    children,
    ...rest
  },
  ref
) {
  const isInert = disabled || loading;

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconEl = Icon ? (
    <motion.span
      className={styles.icon}
      variants={iconPosition === 'right' ? iconNudge : undefined}
      transition={hoverSpring}
      aria-hidden="true"
    >
      <Icon className={styles.iconSvg} strokeWidth={2} />
    </motion.span>
  ) : null;

  const content = (
    <>
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <Loader2 className={styles.iconSvg} strokeWidth={2} />
        </span>
      )}
      {!loading && iconPosition === 'left' && iconEl}
      <span className={styles.label}>{children}</span>
      {!loading && iconPosition === 'right' && iconEl}
    </>
  );

  const motionProps = isInert
    ? { initial: 'rest', animate: 'rest' }
    : {
        initial: 'rest',
        animate: 'rest',
        whileHover: 'hover',
        whileTap: 'press',
        variants: buttonVariants,
        transition: hoverSpring,
      };

  if (to && !isInert) {
    return (
      <MotionRouterLink ref={ref} to={to} className={classes} {...motionProps} {...rest}>
        {content}
      </MotionRouterLink>
    );
  }

  if (href && !isInert) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      disabled={isInert}
      aria-busy={loading || undefined}
      {...motionProps}
      {...rest}
    >
      {content}
    </motion.button>
  );
});

export default Button;
