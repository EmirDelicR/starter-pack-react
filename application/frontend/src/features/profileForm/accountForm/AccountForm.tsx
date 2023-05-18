import { ChangeEvent } from 'react';

import { Input } from '@/UI/components';
import FormContext, {
  ContextType
} from '@/features/profileForm/context/FormContext';
import useFormContext from '@/hooks/useFormContext';

export default function AccountForm() {
  const { data, handleChange } = useFormContext<ContextType>(FormContext);
  const { firstName, lastName, age } = data;

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    handleChange({ [field]: event.target.value });
  };

  return (
    <div style={{ width: '100%' }}>
      <Input
        label="First Name"
        onChange={(event) => onChange(event, 'firstName')}
        value={firstName}
      />
      <Input
        label="Last Name"
        onChange={(event) => onChange(event, 'lastName')}
        value={lastName}
      />
      <Input
        type="number"
        label="Age"
        min="0"
        onChange={(event) => onChange(event, 'age')}
        value={age}
      />
    </div>
  );
}
