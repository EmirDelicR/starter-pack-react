import { useTranslation } from 'react-i18next';
import { ComponentProps, ForwardedRef, MouseEvent, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { PAGES, SOCIAL_PAGES } from '@utils/constants';

import './Navigation.scss';

interface NavigationProps extends Omit<ComponentProps<'div'>, 'onClick'> {
  onClick: (id: string | null) => void;
}

interface NavLinkProps extends NavigationProps {
  page: string;
}

function NavLink({ page, onClick }: NavLinkProps) {
  const { t } = useTranslation();

  const onClickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick(page);
  };

  return (
    <div className="nav__item" onClick={onClickHandler}>
      <a className="link link--page" href={page} rel="noreferrer">
        {t(`navBar.${page}`)}
      </a>
    </div>
  );
}

interface SocialLinkProps {
  item: {
    name: string;
    icon: IconProp;
    link: string;
    download?: string;
  };
}

function SocialLink({ item: { name, icon, link, download } }: SocialLinkProps) {
  return (
    <a
      className="link link--social link--faded"
      href={link}
      target="_blank"
      rel="noreferrer"
      download={download}
    >
      <FontAwesomeIcon icon={icon} size="2x" />
      <i title={name.toUpperCase()} className={`${icon}`}></i>
    </a>
  );
}

const Navigation = forwardRef(function Navigation(
  { onClick }: NavigationProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <nav className="nav" ref={ref}>
      {PAGES.map((name) => (
        <NavLink page={name} key={name} onClick={onClick} />
      ))}
      <div className="nav__item nav__item--social">
        {SOCIAL_PAGES.map((item) => (
          <SocialLink item={item} key={item.name} />
        ))}
      </div>
    </nav>
  );
});

export default Navigation;
