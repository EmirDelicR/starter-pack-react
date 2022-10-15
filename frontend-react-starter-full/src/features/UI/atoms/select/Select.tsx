import {
  DetailedHTMLProps,
  FunctionComponent,
  MouseEvent,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import useOutsideElementClick from 'hooks/useOutsideElementClick';

import styles from './Select.module.scss';

type SelectType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  preDefinedValue: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple: false;
  preDefinedValue?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = SelectType & {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select: FunctionComponent<SelectProps> = ({
  preDefinedValue,
  onChange,
  options,
  multiple
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const outsideClickHandler = useCallback(() => setIsOpen(false), []);
  useOutsideElementClick(containerRef, outsideClickHandler);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const clearData = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (selectedOption: SelectOption) => {
    if (multiple) {
      if (preDefinedValue.includes(selectedOption)) {
        onChange(preDefinedValue.filter((option) => option !== selectedOption));
      } else {
        onChange([...preDefinedValue, selectedOption]);
      }
    } else {
      if (selectedOption !== preDefinedValue) onChange(selectedOption);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? preDefinedValue.includes(option) : option === preDefinedValue;
  };

  const onContainerClickHandler = () => setIsOpen((prev) => !prev);
  const onClearButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    clearData();
  };
  const renderSelectedValues = () => {
    if (!multiple) {
      return preDefinedValue?.label;
    }
    return preDefinedValue.map((option) => {
      const onCLickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        selectOption(option);
      };
      return (
        <button key={option.value} onClick={onCLickHandler} className={styles['option-badge']}>
          {option.label}
          <span className={styles['remove-btn']}>&times;</span>
        </button>
      );
    });
  };

  const renderOptionList = () => {
    return options.map((option, index) => {
      const onListItemClick = (event: MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        selectOption(option);
        setIsOpen(false);
      };
      const onMouseEnterHandler = () => setHighlightedIndex(index);
      const createdClass = `${styles.option} ${isOptionSelected(option) ? styles.selected : ''} ${
        index === highlightedIndex ? styles.highlighted : ''
      }`;

      return (
        <li
          onClick={onListItemClick}
          onMouseEnter={onMouseEnterHandler}
          key={option.value}
          className={createdClass}>
          {option.label}
        </li>
      );
    });
  };

  return (
    <div
      role="select"
      ref={containerRef}
      onClick={onContainerClickHandler}
      className={styles.container}>
      <span className={styles.value}>{renderSelectedValues()}</span>
      <button onClick={onClearButtonClickHandler} className={styles['clear-btn']}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul role="select-list" className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {renderOptionList()}
      </ul>
    </div>
  );
};
