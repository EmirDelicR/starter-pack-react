import { MouseEvent, useCallback } from 'react';

import { classNameHelper } from '@/utils';

import classes from './Select.module.scss';
import useSelect from './useSelect';

export type SelectOption = {
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
  onChange: (value: SelectOption) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  preDefinedValue,
  onChange,
  options,
  multiple
}: SelectProps) {
  const {
    isOpen,
    highlightedIndex,
    containerRef,
    setIsOpen,
    setHighlightedIndex,
    onContainerClick
  } = useSelect();
  const showClass = isOpen ? classes.show : '';

  const clearData = () => {
    multiple && onChange([]);
  };

  const selectOption = (selectedOption: SelectOption) => {
    if (!multiple && selectedOption !== preDefinedValue) {
      onChange(selectedOption);
    }

    if (!multiple) {
      return;
    }

    if (preDefinedValue.includes(selectedOption)) {
      onChange(preDefinedValue.filter((option) => option !== selectedOption));
    } else {
      onChange([...preDefinedValue, selectedOption]);
    }
  };

  const isOptionSelected = useCallback(
    (option: SelectOption) => {
      return multiple
        ? preDefinedValue.includes(option)
        : option === preDefinedValue;
    },
    [multiple, preDefinedValue]
  );

  const onClearButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    clearData();
  };

  const renderSelectedValues = () => {
    if (!multiple) {
      return preDefinedValue?.label;
    }
    return preDefinedValue.map((option) => {
      const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        selectOption(option);
      };
      return (
        <button
          key={option.value}
          onClick={onClickHandler}
          className={classes['option-badge']}
        >
          {option.label}
          <span className={classes['remove-btn']}>x</span>
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
      const selectedClass = isOptionSelected(option) ? classes.selected : '';
      const highlightedClass =
        index === highlightedIndex ? classes.highlighted : '';

      return (
        <li
          onClick={onListItemClick}
          onMouseEnter={onMouseEnterHandler}
          key={option.value}
          className={classNameHelper(
            classes.option,
            selectedClass,
            highlightedClass
          )}
        >
          {option.label}
        </li>
      );
    });
  };

  return (
    <div
      role="select"
      ref={containerRef}
      onClick={onContainerClick}
      className={classes.container}
    >
      <span className={classes.value}>{renderSelectedValues()}</span>
      <button
        onClick={onClearButtonClick}
        className={classNameHelper(
          classes['clear-btn'],
          multiple ? '' : classes.hide
        )}
      >
        x
      </button>
      <div className={classes.divider}></div>
      <div className={classes.caret}></div>
      <ul className={classNameHelper(classes.options, showClass)}>
        {renderOptionList()}
      </ul>
    </div>
  );
}
