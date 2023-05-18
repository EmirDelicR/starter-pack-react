import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { BsCheckSquareFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Button } from '@/UI/components';
import ProfileForm from '@/features/profileForm/ProfileForm';
import { FormProvider } from '@/features/profileForm/context/FormContext';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  logoutUser,
  selectIsUserProfileUpdated,
  selectUser
} from '@/store/userSlice';

import classes from './ProfilePage.module.scss';

function UpdatedProfile({
  onEdit
}: {
  onEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onUserLogoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const onEditUserHandler = () => {
    onEdit(false);
  };

  return (
    <div className={classes.updated}>
      <Avatar size={10} src={user.avatar} />
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>User Name: {user.userName}</p>
      <p>
        Is subscribed:{' '}
        {user.isSubscribed ? <BsCheckSquareFill /> : <AiOutlineCloseSquare />}
      </p>
      <p>
        Subscription to:{' '}
        {user.subscriptions.length
          ? user.subscriptions.map((item: string) => (
              <span key={item}>{item.toUpperCase()}</span>
            ))
          : '-'}
      </p>
      <div>
        <Button onClick={onUserLogoutHandler}>Logout</Button>
        <Button onClick={onEditUserHandler}>Edit data</Button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const location = useLocation();
  const isUserProfileUpdated = useAppSelector(selectIsUserProfileUpdated);
  const [updateUser, setUpdateUser] = useState(true);

  useEffect(() => {
    if (location.state?.isEditDone) {
      setUpdateUser(true);
    }
  }, [location]);

  if (isUserProfileUpdated && updateUser) {
    return (
      <div className={classes.profile}>
        <UpdatedProfile onEdit={setUpdateUser} />
      </div>
    );
  }

  return (
    <div className={classes.profile}>
      <FormProvider>
        <ProfileForm />
      </FormProvider>
    </div>
  );
}
