import { Avatar, Upload } from '@/UI/components';
import FormContext, {
  ContextType
} from '@/features/profileForm/context/FormContext';
import useFormContext from '@/hooks/useFormContext';

import classes from './AvatarUpload.module.scss';

export default function AvatarForm() {
  const { data, handleChange } = useFormContext<ContextType>(FormContext);

  const handleChangeUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    handleChange({ image: file, preview });
  };

  return (
    <div className={classes['avatar-upload']}>
      <Avatar size={10} src={data.preview} />
      <Upload handleUpload={handleChangeUpload} />
    </div>
  );
}
