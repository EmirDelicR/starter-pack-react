import { ChangeEvent, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Error, Loader, Stepper } from '@/UI/components';
import AvatarForm from '@/features/profileForm/avatarUpload/AvatarUpload';
import useFormContext from '@/hooks/useFormContext';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser } from '@/store/userSlice';
import { useUpdateUserMutation } from '@/store/userSlice/userApiSlice';
import { selectUserId } from '@/store/userSlice/userStoreSlice';
import { createFormData } from '@/utils';

import classes from './ProfileForm.module.scss';
import AccountForm from './accountForm/AccountForm';
import FormContext, { ContextType } from './context/FormContext';
import SubscriptionForm from './subscriptionForm/SubscriptionForm';

const PAGES: { [key: number]: ReactNode } = {
  0: <AccountForm />,
  1: <AvatarForm />,
  2: <SubscriptionForm />
};

const TITLES: { [key: number]: string } = {
  0: 'Account',
  1: 'Appearance',
  2: 'Subscription'
};

export default function ProfileForm() {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, canSubmit, isDataFilled } =
    useFormContext<ContextType>(FormContext);
  const { page, goBack, goNext, goToPage, disableBack, disableNext } =
    useMultiStepForm(TITLES);
  const [updateUser, { isLoading, data: userData, isError, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (userData?.status === 200) {
      URL.revokeObjectURL(data.preview);
      dispatch(setUser(userData));
      navigate('/profile', { replace: true, state: { isEditDone: true } });
    }
  }, [userData?.status]);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { preview, ...rest } = data;
    const formData = createFormData({ ...rest, avatar: data.image?.name });
    await updateUser({ formData, userId });
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    return <div className={classes.page}>{PAGES[page]}</div>;
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <header className={classes.header}>
        <h1>{TITLES[page]}</h1>
      </header>
      <Stepper
        numberOfStages={Object.keys(TITLES).length}
        currentStep={page}
        onClickHandler={goToPage}
      />
      {renderContent()}
      <Error isError={isError} error={error} />
      <div className={classes.control}>
        <Button
          size="small"
          type="button"
          onClick={goBack}
          isDisabled={disableBack}
        >
          Back
        </Button>
        <Button
          size="small"
          type="button"
          onClick={goNext}
          isDisabled={disableNext || !isDataFilled}
        >
          Next
        </Button>

        <Button
          type="submit"
          size="small"
          isDisabled={!canSubmit || !disableNext || isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
