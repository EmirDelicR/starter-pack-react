import { useState } from 'react';

import { Button } from '@/UI/components';

import styles from './Auth.module.scss';
import SignInForm from './signin/SignInForm';
import SignUpForm from './signup/SignUpForm';

export default function Auth() {
  const [isActive, setIsActive] = useState(false);
  const onClickHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles.container}>
        <div className={styles.backdrop}>
          <div className={styles.box}>
            <div className={styles['box-content']}>
              <h2>Already have an account?</h2>
              <Button onClick={onClickHandler} size="large">
                Login
              </Button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles['box-content']}>
              <h2>Do not have an account?</h2>
              <Button onClick={onClickHandler} size="large">
                Create account
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`${styles['form-wrapper']} ${
            isActive ? styles.active : ''
          }`}
        >
          <div
            className={`${styles.content} ${
              !isActive ? styles['content-active'] : ''
            }`}
          >
            <SignInForm />
          </div>
          <div
            className={`${styles.content} ${
              isActive ? styles['content-active'] : ''
            }`}
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
