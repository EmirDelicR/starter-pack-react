import { ChangeEvent, InputHTMLAttributes } from 'react';

import classes from './Checkbox.module.scss';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string;
  id: string;
  isChecked: boolean;
  onChange: (data: { [key: string]: boolean }) => void;
}

export function Checkbox({ name, id, isChecked, onChange }: Props) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const data = { [event.target.name]: event.target.checked };
    onChange(data);
  };

  return (
    <input
      className={classes.checkbox}
      type="checkbox"
      checked={isChecked}
      name={name}
      id={id}
      onChange={onChangeHandler}
    />
  );
}
