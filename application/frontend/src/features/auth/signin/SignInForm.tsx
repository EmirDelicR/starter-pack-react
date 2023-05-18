import { Button, Error, Input, Loader } from '@/UI/components';
import { useLoginMutation } from '@/features/auth/authStore/authApiSlice';
import useAuth from '@/features/auth/useAuth';

import classes from './SignInForm.module.scss';

export default function SignInForm() {
  const [login, { isLoading, data, isError, error }] = useLoginMutation();
  const {
    email,
    password,
    isButtonDisabled,
    onEmailChange,
    onPasswordChange,
    handleFormSubmit
  } = useAuth(login, data, false);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className={classes.content}>
        <Input
          label="Email"
          type="email"
          onChange={onEmailChange}
          value={email.value}
          data-testid="login-email"
        />
        <Input
          label="Password"
          type="password"
          onChange={onPasswordChange}
          value={password.value}
          useValidator={false}
          data-testid="login-password"
        />
        <Button
          size="large"
          type="button"
          onClick={handleFormSubmit}
          isDisabled={isButtonDisabled}
          data-testid="login-submit"
        >
          Login
        </Button>
      </div>
    );
  };

  return (
    <form className={classes.signin}>
      <h3>Login</h3>
      {renderContent()}
      <Error isError={isError} error={error} />
    </form>
  );
}
