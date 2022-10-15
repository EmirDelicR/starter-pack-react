import { FunctionComponent } from 'react';
import { BiCheckShield, BiError, BiInfoCircle, BiMessageRoundedError } from 'react-icons/bi';

import styles from './Message.module.scss';

export enum IconType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  NONE = 'none'
}

interface Props {
  type?: IconType;
  message: string;
}

const renderIcon = (type: IconType) => {
  switch (type) {
    case IconType.SUCCESS:
      return <BiCheckShield fill={styles.successColor} />;
    case IconType.ERROR:
      return <BiMessageRoundedError fill={styles.errorColor} />;
    case IconType.INFO:
      return <BiInfoCircle fill={styles.infoColor} />;
    case IconType.WARNING:
      return <BiError fill={styles.warningColor} />;
    default:
      return null;
  }
};

export const Message: FunctionComponent<Props> = ({ type = IconType.INFO, message }) => {
  const containerClass = `${styles.message} ${styles[type]}`;
  const iconClass = `${styles[`icon-${type}`]}`;

  return (
    <div className={containerClass}>
      {type !== IconType.NONE && <div className={iconClass}>{renderIcon(type)}</div>}
      <div className={styles.text}>{message}</div>
    </div>
  );
};
