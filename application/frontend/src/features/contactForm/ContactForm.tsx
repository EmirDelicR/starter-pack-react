import { ChangeEvent, useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

import { Button, Error, Input, Loader, Textarea } from '@/UI/components';
import { InputData, emailValidator, onInputChange } from '@/utils';

import classes from './ContactForm.module.scss';
import {
  IContactFormMessage,
  useSendMessageMutation
} from './contactFormStore';

interface Props {
  onSubmitCallback: () => void;
}

export default function ContactForm({ onSubmitCallback }: Props) {
  const [email, setEmail] = useState<InputData>({ value: '', isValid: false });
  const [fullName, setFullName] = useState<InputData>({
    value: '',
    isValid: false
  });
  const [text, setText] = useState<string>('');
  const [sendMessage, { isLoading, isError, error, isSuccess }] =
    useSendMessageMutation();
  const isButtonDisabled = !(email.isValid && fullName.isValid);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value, setEmail, emailValidator);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value, setFullName);
  };

  const resetForm = () => {
    setEmail({ value: '', isValid: false });
    setFullName({ value: '', isValid: false });
    setText('');
  };

  const handleFormSubmit = async () => {
    const data: IContactFormMessage = {
      email: email.value,
      fullName: fullName.value,
      message: text
    };

    await sendMessage(data);

    if (isSuccess) {
      resetForm();
      onSubmitCallback();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error isError={isError} error={error} />;
  }

  return (
    <div className={classes.form}>
      <FaEnvelopeOpenText className={classes.icon} />
      <Input
        label="Email"
        value={email.value}
        type="email"
        onChange={onEmailChange}
      />
      <Input label="Full Name" value={fullName.value} onChange={onNameChange} />
      <Textarea onChangeHandler={setText} value={text} />
      <Button
        size="large"
        type="submit"
        onClick={handleFormSubmit}
        isDisabled={isButtonDisabled}
      >
        Send message
      </Button>
    </div>
  );
}
