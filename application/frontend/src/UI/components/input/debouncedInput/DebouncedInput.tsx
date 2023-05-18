import { InputHTMLAttributes, useEffect, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';

import classes from './DebouncedInput.module.scss';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  ...props
}: Props) {
  const [localValue, setLocalValue] = useState<string>(initialValue);

  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [localValue]);

  return (
    <div className={classes['search-box']}>
      <button className={classes['btn-search']}>
        <AiOutlineFileSearch />
      </button>
      <input
        type="text"
        className={classes['input-search']}
        {...props}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
