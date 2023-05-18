import { Button, Error, Input, Loader } from '@/UI/components';
import { useRegisterMutation } from '@/features/auth/authStore/authApiSlice';
import useAuth from '@/features/auth/useAuth';

import classes from './SignUpForm.module.scss';

export default function SignUpForm() {
  const [register, { isLoading, data, isError, error }] = useRegisterMutation();
  const {
    email,
    password,
    isButtonDisabled,
    onEmailChange,
    onPasswordChange,
    handleFormSubmit
  } = useAuth(register, data);

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
        />
        <Input
          label="Password"
          type="password"
          onChange={onPasswordChange}
          value={password.value}
          hintText="Password must contain minimum 8 characters,one number and one of this special signs !#$%&()*+,-/:;<=>?"
        />
        <Button
          size="large"
          type="button"
          onClick={handleFormSubmit}
          isDisabled={isButtonDisabled}
        >
          Create
        </Button>
      </div>
    );
  };

  return (
    <form className={classes.signup}>
      <h3>Create account</h3>
      {renderContent()}
      <Error isError={isError} error={error} />
    </form>
  );
}
