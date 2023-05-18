import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import classes from './SocialLink.module.scss';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  name: string;
}

export function SocialLink({
  href,
  name,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <a
      className={classes['social-link']}
      href={href}
      rel="noreferrer"
      target="_blank"
      {...rest}
    >
      {children}
      <span className={classes['social-name']}>{name}</span>
    </a>
  );
}
