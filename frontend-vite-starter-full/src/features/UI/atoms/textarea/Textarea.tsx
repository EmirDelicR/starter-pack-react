import { ChangeEvent, DetailedHTMLProps, FunctionComponent, TextareaHTMLAttributes } from 'react';

import styles from './Textarea.module.scss';

type TextareaType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface Props {
  value?: string;
  onChangeHandler: (data: { [key: string]: string }) => void;
  label?: string | null | undefined;
}

export const Textarea: FunctionComponent<TextareaType & Props> = ({
  onChangeHandler,
  value = '',
  label = null,
  ...rest
}) => {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const data = { value: event.target.value };
    onChangeHandler(data);
  };

  const renderLabel = () => {
    return label ? <label>{label}</label> : null;
  };

  return (
    <div className={styles.container}>
      {renderLabel()}
      <textarea
        {...rest}
        className={styles.textarea}
        role="textarea"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
