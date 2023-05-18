import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import classes from './Link.module.scss';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
}

export function Link({ href, children, ...rest }: PropsWithChildren<Props>) {
  return (
    <a
      className={classes.link}
      href={href}
      rel="noreferrer"
      target="_blank"
      {...rest}
    >
      {children}
    </a>
  );
}
