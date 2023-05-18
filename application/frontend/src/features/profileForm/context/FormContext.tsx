import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState
} from 'react';

import { IUser } from '@/store/userSlice';

type AccountData = Pick<IUser, 'firstName' | 'lastName' | 'age'>;
type AccountFormData = Pick<IUser, 'isSubscribed' | 'subscriptions'>;
type FormData = AccountData &
  AccountFormData & {
    [key: string]: unknown;
    preview: string;
    image: File | null;
  };

const ACCOUNT_FORM_DATA: AccountData = {
  firstName: '',
  lastName: '',
  age: ''
};

const INITIAL_DATA: FormData = {
  ...ACCOUNT_FORM_DATA,
  image: null,
  subscriptions: [],
  isSubscribed: true,
  preview: ''
};

export type ContextType = {
  data: FormData;
  canSubmit: boolean;
  isDataFilled: boolean;
  setData: Dispatch<SetStateAction<FormData>>;
  handleChange: (data: { [key: string]: unknown }) => void;
};

const FormContext = createContext<ContextType>({
  data: INITIAL_DATA,
  canSubmit: false,
  isDataFilled: false,
  setData: () => undefined,
  handleChange: () => undefined
});

export function FormProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  const handleChange = (data: { [key: string]: unknown }) => {
    setData((prevData) => ({
      ...prevData,
      ...data
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subscriptions, isSubscribed, ...required } = data;
  const canSubmit = [...Object.values(required)].every(Boolean);

  const isDataFilled = Object.keys(ACCOUNT_FORM_DATA)
    .map((key: string) => data[key])
    .every(Boolean);

  return (
    <FormContext.Provider
      value={{
        data,
        canSubmit,
        isDataFilled,
        setData,
        handleChange
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
