import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { IconType, Message } from '@/UI/components';
import { normalizeError } from '@/utils';

interface Props {
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | { error: string } | undefined;
}

export function Error({ isError, error }: Props) {
  if (!isError) {
    return null;
  }

  const { message = 'Unknown Error occurred!' } = normalizeError(error);
  return <Message message={message} type={IconType.ERROR} />;
}
