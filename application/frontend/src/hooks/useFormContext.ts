import { Context, useContext } from 'react';

export default function useFormContext<T>(FormContext: Context<T>) {
  return useContext(FormContext);
}
