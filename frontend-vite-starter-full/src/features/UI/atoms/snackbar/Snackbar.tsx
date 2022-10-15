import { FunctionComponent, memo, useEffect, useState } from 'react';

import styles from './Snackbar.module.scss';
import useAutoClose, { type Toast } from './useAutoClose';

interface Props {
  message: Toast;
  icon: any;
}

const SnackBar: FunctionComponent<Props> = ({ message, icon }) => {
  const [toast, setToast] = useState<Toast | null>(null);

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
    <div className={styles.toast}>
      <div key={toast.id} className={styles.element}>
        {icon}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
export const Snack = memo(SnackBar);
