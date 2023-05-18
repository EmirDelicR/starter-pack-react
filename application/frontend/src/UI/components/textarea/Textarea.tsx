import { ChangeEvent } from 'react';

import classes from './Textarea.module.scss';

interface Props {
  value?: string;
  onChangeHandler: (data: string) => void;
  label?: string | null | undefined;
}

export function Textarea({ onChangeHandler, value = '', label = null }: Props) {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeHandler(event.target.value);
  };

  return (
    <div className={classes.container}>
      {label && <label>{label}</label>}
      <textarea className={classes.textarea} role="textarea" onChange={onChange} value={value} />
    </div>
  );
}
