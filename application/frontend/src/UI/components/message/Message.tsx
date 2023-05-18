import {
  BiCheckShield,
  BiError,
  BiInfoCircle,
  BiMessageRoundedError
} from 'react-icons/bi';

import { classNameHelper } from '@/utils';

import classes from './Message.module.scss';

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

function renderIcon(type: IconType) {
  switch (type) {
    case IconType.SUCCESS:
      return <BiCheckShield role="icon-success" fill={classes.successColor} />;
    case IconType.ERROR:
      return (
        <BiMessageRoundedError role="icon-error" fill={classes.errorColor} />
      );
    case IconType.INFO:
      return <BiInfoCircle role="icon-info" fill={classes.infoColor} />;
    case IconType.WARNING:
      return <BiError role="icon-warning" fill={classes.warningColor} />;
    default:
      return null;
  }
}

export function Message({ type = IconType.INFO, message }: Props) {
  return (
    <div
      className={classNameHelper(classes.message, classes[type])}
      data-testid="log-message"
    >
      {type !== IconType.NONE && (
        <div className={classes[`icon-${type}`]}>{renderIcon(type)}</div>
      )}
      <div className={classes.text}>{message}</div>
    </div>
  );
}
