import { useEffect, useState } from 'react';

const DISMISS_TIME = 5000;

export type ToastData = { id: string; message: string };

interface Props {
  toast: ToastData | null;
  setToast: (toast: ToastData | null) => void;
}

export default function useAutoClose({ toast, setToast }: Props) {
  const [toastIdToRemove, setToastIdToRemove] = useState('');

  useEffect(() => {
    if (toastIdToRemove) {
      setToast(null);
      setToastIdToRemove('');
    }
  }, [toastIdToRemove]);

  useEffect(() => {
    if (toast) {
      const id = toast.id;
      setTimeout(() => setToastIdToRemove(id), DISMISS_TIME);
    }
  }, [toast]);
}
