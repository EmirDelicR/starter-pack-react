import { ComponentProps, ForwardedRef, forwardRef } from 'react';

import './MenuButton.scss';

interface Props extends Omit<ComponentProps<'button'>, 'onClick'> {
  onClick: () => void;
}

const MenuButton = forwardRef(function MenuButton(
  { onClick }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className="menu-button"
      ref={ref}
      onClick={onClick}
      aria-label="mobile-nav-button"
    >
      <span></span>
    </button>
  );
});

export default MenuButton;
