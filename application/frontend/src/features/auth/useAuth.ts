import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store';
import { IUserResponse, setUser } from '@/store/userSlice';
import {
  InputData,
  emailValidator,
  onInputChange,
  passwordValidator
} from '@/utils';

import { authFunctionType } from './authStore';

const useAuth = (
  onSubmit: authFunctionType,
  response: IUserResponse | undefined,
  validatePassword = true
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<InputData>({ value: '', isValid: false });
  const [password, setPassword] = useState<InputData>({
    value: '',
    isValid: false
  });
  const isButtonDisabled = !(email.isValid && password.isValid);

  useEffect(() => {
    if (response?.status === 201 || response?.status === 200) {
      dispatch(setUser(response));
      navigate('/');
    }
  }, [response?.status]);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value, setEmail, emailValidator);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validatePassword) {
      onInputChange(event.target.value, setPassword, passwordValidator);
    } else {
      onInputChange(event.target.value, setPassword);
    }
  };

  const handleFormSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await onSubmit({
      email: email.value,
      password: password.value
    });
  };

  return {
    email,
    password,
    isButtonDisabled,
    onEmailChange,
    onPasswordChange,
    handleFormSubmit
  };
};

export default useAuth;
