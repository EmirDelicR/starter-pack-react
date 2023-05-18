import { useEffect, useState } from 'react';

import { Checkbox, Select, SelectOption } from '@/UI/components';
import FormContext, {
  ContextType
} from '@/features/profileForm/context/FormContext';
import useFormContext from '@/hooks/useFormContext';

import classes from './SubscriptionForm.module.scss';

const OPTIONS: SelectOption[] = [
  { label: 'News', value: 'news' },
  { label: 'Code', value: 'code' },
  { label: 'General', value: 'general' }
];

function convertArray(values: SelectOption[]) {
  return values.map((item: SelectOption) => item.value);
}

export default function SubscriptionForm() {
  const { data, handleChange } = useFormContext<ContextType>(FormContext);
  const [selectValues, setSelectValue] = useState<SelectOption[]>([OPTIONS[0]]);

  useEffect(() => {
    if (!data.isSubscribed) {
      return;
    }

    handleChange({ subscriptions: convertArray(selectValues) });
  }, [data.isSubscribed]);

  const onSelectChange = (values: SelectOption[]) => {
    setSelectValue(values);
    handleChange({ subscriptions: convertArray(values) });
  };

  const onCheckboxChange = (checkBoxData: { [key: string]: boolean }) => {
    if (checkBoxData.isSubscribed) {
      handleChange({
        subscriptions: convertArray(selectValues),
        isSubscribed: true
      });
    } else {
      handleChange({ subscriptions: [], isSubscribed: false });
    }
  };

  return (
    <div className={classes['subscribe-form']}>
      <Checkbox
        isChecked={data.isSubscribed}
        id="isSubscribed"
        name="isSubscribed"
        onChange={onCheckboxChange}
      />
      <div className={classes['select-wrapper']}>
        {data.isSubscribed && (
          <Select
            multiple={true}
            options={OPTIONS}
            onChange={onSelectChange}
            preDefinedValue={selectValues}
          />
        )}
      </div>
    </div>
  );
}
