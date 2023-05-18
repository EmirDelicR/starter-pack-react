import { useRef } from 'react';
import { GiEnvelope } from 'react-icons/gi';

import { Button, useModal } from '@/UI/components';
import ContactForm from '@/features/contactForm/ContactForm';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { classNameHelper } from '@/utils';

import classes from './Contact.module.scss';

export function Contact() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(divRef, {});
  const isVisible = !!entry?.isIntersecting;
  const { openModal, closeModal, Modal } = useModal(modalRef);
  const connerClass = !isVisible ? classes.conner : '';

  return (
    <div className={classes.contact}>
      <div className={classes['button-wrapper']}>
        <div ref={divRef}></div>
        <Button
          size="medium"
          className={classNameHelper(classes['btn-talk'], connerClass)}
          onClick={openModal}
        >
          <GiEnvelope className={classes.envelope} />
          <span className={classes.text}>Let&lsquo;s talk!</span>
        </Button>
        <Modal modalHeader="Send us message">
          <ContactForm onSubmitCallback={closeModal} />
        </Modal>
      </div>
    </div>
  );
}
