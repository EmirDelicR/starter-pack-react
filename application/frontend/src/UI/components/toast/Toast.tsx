import { memo, ReactNode, useEffect, useState } from 'react';

import classes from './Toast.module.scss';
import useAutoClose, { type ToastData } from './useAutoClose';

interface Props {
  message: ToastData;
  icon?: ReactNode;
  type?: 'error' | 'success' | 'default';
}

function ToastContent({ message, icon = null, type = 'default' }: Props) {
  const [toast, setToast] = useState<ToastData | null>(null);

  useAutoClose({
    toast,
    setToast
  });

  useEffect(() => {
    if (message) {
      setToast(message);
    }
  }, [message]);

  if (!toast) {
    return null;
  }

  return (
    <div className={classes.toast}>
      <div key={toast.id} className={`${classes.element} ${classes[type]}`}>
        {icon}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
export const Toast = memo(ToastContent);
