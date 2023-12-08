import { memo } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaRegCopyright,
  FaSitemap
} from 'react-icons/fa';

import { SocialLink } from '@/UI/components';
import Logo from '@/media/main-logo.svg?react';

import classes from './Footer.module.scss';

function Component() {
  return (
    <div className={classes.footer}>
      <div className={classes.content}>
        <div className={classes.copyright}>
          <Logo className={classes.logo} />
          <span className={classes.text}>
            <FaRegCopyright /> {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className={classes['link-wrapper']}>
          <SocialLink href="#" name="Github" aria-label="Github link">
            <FaGithub />
          </SocialLink>
          <SocialLink href="#" name="Linkedin" aria-label="Linkedin link">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="#" name="My Web" aria-label="Personal website">
            <FaSitemap />
          </SocialLink>
        </div>
      </div>

      <div className={classes.wave}>
        <svg viewBox="0 24 150 28" shapeRendering="auto">
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={classes.parallax}>
            <use xlinkHref="#wave" x="48" y="0" fill="rgb(77, 169, 219, 0.7)" />
            <use xlinkHref="#wave" x="48" y="3" fill="rgb(77, 169, 219, 0.5)" />
            <use xlinkHref="#wave" x="48" y="5" fill="rgb(77, 169, 219, 0.3)" />
            <use xlinkHref="#wave" x="48" y="7" fill="rgb(77, 169, 219)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export const Footer = memo(Component);
