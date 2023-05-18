import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { localStorageHelper } from '@/utils';

import { IUserState } from './userInterface';

export const INITIAL_USER_DATA: IUserState = {
  data: {
    age: '',
    avatar: '',
    email: '',
    firstName: '',
    id: '',
    isLoggedIn: false,
    isProfileUpdated: false,
    isSubscribed: false,
    lastName: '',
    subscriptions: [],
    token: null,
    userName: ''
  }
};

export const userStoreSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_DATA,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      const [setToken] = localStorageHelper<string | null>('token');
      const { data } = action.payload;
      setToken(data.token);
      state.data = data;
    },
    logoutUser: (state) => {
      const [setToken] = localStorageHelper<string | null>('token');
      setToken(null);
      state.data = INITIAL_USER_DATA.data;
    }
  }
});

export const { setUser, logoutUser } = userStoreSlice.actions;

export const selectUser = (state: RootState) => state.user.data;
export const selectIsUserProfileUpdated = (state: RootState) =>
  state.user.data.isProfileUpdated;
export const selectToken = (state: RootState) => state.user.data.token;
export const selectIsUserLoggedIn = (state: RootState) =>
  state.user.data.isLoggedIn;
export const selectUserId = (state: RootState) => state.user.data.id;
