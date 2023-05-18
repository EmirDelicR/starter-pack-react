import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAutoLoginMutation } from '@/features/auth/authStore';
import { useAppDispatch } from '@/store';
import { IUserResponse, setUser } from '@/store/userSlice';
import { localStorageHelper } from '@/utils';

import useAsyncEffect from './useAsyncEffect';

/**
 * @description This hook make auto login of the user with token
 */
export default function useAutoLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [autoLogin] = useAutoLoginMutation();
  const [, getToken] = localStorageHelper<string>('token');

  const makeApiCall = useCallback(async () => {
    const token = getToken('token');

    if (!token) {
      return;
    }

    const response = (await autoLogin(token)) as { data: IUserResponse };
    if (response?.data && response?.data?.status === 200) {
      dispatch(setUser(response.data));
    } else {
      navigate('/');
    }
  }, []);

  useAsyncEffect(makeApiCall);
}
