import { PropsWithChildren, RefObject } from 'react';
import { CgCloseO } from 'react-icons/cg';

import { Button } from '@/UI/components';

import classes from './Modal.module.scss';

interface Props extends PropsWithChildren {
  hideFooter?: boolean;
  modalHeader?: string;
}

export function useModal(modalRef: RefObject<HTMLDialogElement>) {
  const openModal = () => {
    document.body.style.overflow = 'hidden';
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    modalRef.current?.close();
  };

  function Modal({ children, modalHeader = '', hideFooter = false }: Props) {
    return (
      <dialog
        className={classes.modal}
        onClose={closeModal}
        role="dialog"
        ref={modalRef}
      >
        <div className={classes.header}>
          <h3>{modalHeader}</h3> <CgCloseO onClick={closeModal} />
        </div>
        <div className={classes.body}>{children}</div>
        {!hideFooter && (
          <div className={classes.footer}>
            <Button size="large" onClick={closeModal}>
              Close
            </Button>
          </div>
        )}
      </dialog>
    );
  }

  return {
    Modal,
    openModal,
    closeModal
  };
}
