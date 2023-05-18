import { CSSProperties, PropsWithChildren, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';

import classes from './Avatar.module.scss';

interface Props extends PropsWithChildren {
  src?: string | undefined;
  size?: number;
  radius?: number;
}

export function Avatar({
  src = undefined,
  size = 3,
  radius = 50,
  children
}: Props) {
  const [error, setError] = useState(!src);

  useEffect(() => {
    !src ? setError(true) : setError(false);
  }, [src]);

  const renderAvatar = () => {
    if (error) {
      return (
        <div className={classes.placeholder} title="Avatar">
          {children || <FaUserAlt className={classes['placeholder-icon']} />}
        </div>
      );
    }

    return (
      <img
        loading="lazy"
        className={classes.image}
        src={src}
        alt="Avatar image"
      />
    );
  };

  return (
    <div
      data-cy="avatar"
      className={classes.avatar}
      style={
        { '--size': `${size}rem`, '--radius': `${radius}%` } as CSSProperties
      }
    >
      {renderAvatar()}
    </div>
  );
}
