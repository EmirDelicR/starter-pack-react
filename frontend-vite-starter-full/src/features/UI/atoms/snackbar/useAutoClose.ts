import { useEffect, useState } from 'react';

export type Toast = { id: string; message: string };

interface Props {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
}

const DISMISS_TIME = 4950;
const useAutoClose = ({ toast, setToast }: Props) => {
  const [toastIdToRemove, setToastIdToRemove] = useState('');

  useEffect(() => {
    if (toastIdToRemove) {
      setToast(null);
      setToastIdToRemove('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastIdToRemove]);

  useEffect(() => {
    if (toast) {
      const id = toast.id;
      setTimeout(() => setToastIdToRemove(id), DISMISS_TIME);
    }
  }, [toast]);
};

export default useAutoClose;
