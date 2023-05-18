import {
  CSSProperties,
  ChangeEvent,
  InputHTMLAttributes,
  useMemo,
  useRef
} from 'react';
import { BsEyeFill, BsInfoSquareFill } from 'react-icons/bs';

import { useModal } from '@/UI/components';
import { classNameHelper } from '@/utils';

import classes from './Input.module.scss';

const NOT_EMPTY_PATTERN = '.{1,}';
const PATTERNS = {
  email: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$',
  password:
    '(?=.{8,})(?=.*?\\d)(?=.*[\\s!#$%&()*+,-/:;<=>?])(?=[a-zA-Z0-9]).*$',
  text: NOT_EMPTY_PATTERN,
  number: '^\\d+$'
};

function getPattern(withValidator: boolean, type: InputType) {
  if (!withValidator) {
    return NOT_EMPTY_PATTERN;
  }

  return PATTERNS[type];
}

type InputType = 'text' | 'password' | 'email' | 'number';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  hintText?: null | string;
  useValidator?: boolean;
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  hintText = null,
  useValidator = true,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { openModal, Modal } = useModal(modalRef);

  const modifiedLabel = useMemo(() => {
    const labelCharacters = Array.from(label);
    return labelCharacters.map((item, index) => {
      return (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          style={{ '--index': index } as CSSProperties}
        >
          {item === ' ' ? '\u00A0' : item}
        </span>
      );
    });
  }, [label]);

  const togglePasswordVisibility = () => {
    if (inputRef.current?.type === 'password') {
      inputRef.current?.setAttribute('type', 'text');
    } else {
      inputRef.current?.setAttribute('type', 'password');
    }
  };

  return (
    <div className={classNameHelper(classes.input)}>
      <input
        ref={inputRef}
        onChange={onChange}
        required
        type={type}
        className={classes.field}
        pattern={getPattern(useValidator, type)}
        placeholder="Enter data"
        value={value}
        {...rest}
      />
      <label htmlFor="email" className={classes.label}>
        {modifiedLabel}
        <span className={classes['sr-only']}>{label}</span>
      </label>
      {hintText && (
        <>
          <BsInfoSquareFill onClick={openModal} className={classes.hint} />
          <Modal modalHeader="Password hint!">
            <p className={classes['hint-text']}>{hintText}</p>
          </Modal>
        </>
      )}
      {type === 'password' && (
        <BsEyeFill
          role="password-toggle"
          className={classes.eye}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}
