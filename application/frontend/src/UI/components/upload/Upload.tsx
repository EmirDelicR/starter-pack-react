import { ChangeEvent, useState } from 'react';
import { BiCloudUpload } from 'react-icons/bi';

import { Error } from '@/UI/components';

import classes from './Upload.module.scss';

interface Props {
  handleUpload: (file: File) => void;
}

export function Upload({ handleUpload }: Props) {
  const [error, setError] = useState<{ error: string } | undefined>(undefined);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];

      if (file.size >= 50000) {
        setError({ error: 'File size is bigger then 50kB' });
        return;
      }

      handleUpload(file);
    } catch (e) {
      console.log('File upload error: ', e);
    }
  };

  return (
    <>
      <label htmlFor="file-upload" className={classes.upload}>
        <BiCloudUpload className={classes['upload-icon']} />
        Upload File
        <input
          className={classes['upload-input']}
          id="file-upload"
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
        />
      </label>
      <Error isError={!!error} error={error} />
    </>
  );
}
