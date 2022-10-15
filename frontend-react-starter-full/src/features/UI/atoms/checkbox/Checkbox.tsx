import { ChangeEvent, DetailedHTMLProps, FunctionComponent, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

type InputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props {
  name: string;
  id: string;
  onChangeHandler: (data: { [key: string]: boolean }) => void;
}

export const Checkbox: FunctionComponent<InputType & Props> = ({
  name,
  id,
  onChangeHandler,
  ...rest
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = { [event.target.name]: event.target.checked };
    onChangeHandler(data);
  };

  return (
    <input
      {...rest}
      className={styles.checkbox}
      type="checkbox"
      name={name}
      id={id}
      role="checkbox"
      onChange={onChange}
    />
  );
};
