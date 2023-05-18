import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as generalUtils from '@/utils/general/general';

import { Upload } from './Upload';

const createDummyFile = () => {
  const blob = new Blob([JSON.stringify('values')]);
  const file = new File([blob], 'img.jpg', {
    type: 'image/jpg'
  });

  return file;
};

describe('<Upload/>', () => {
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });
  const mockHandleUpload = vi.fn();
  vi.spyOn(generalUtils, 'convertToBase64').mockImplementation(
    vi.fn().mockResolvedValue('data')
  );

  afterEach(() => {
    mockHandleUpload.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render upload', () => {
    render(<Upload handleUpload={mockHandleUpload} />);

    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('should call handle upload on input change', async () => {
    render(<Upload handleUpload={mockHandleUpload} />);

    const file = createDummyFile();
    const input = screen.getByLabelText<HTMLInputElement>('Upload File');
    await userEvent.upload(input, file, { applyAccept: false });

    expect(input.files![0]).toBe(file);
    expect(input.files!.item(0)).toBe(file);
    expect(input.files).toHaveLength(1);
    expect(mockHandleUpload).toBeCalledTimes(1);
  });

  it('should not call handle upload on input change if size is bigger then 50000', async () => {
    render(<Upload handleUpload={mockHandleUpload} />);

    const file = createDummyFile();
    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });
    const input = screen.getByLabelText('Upload File');
    await userEvent.upload(input, file, { applyAccept: false });

    expect(mockHandleUpload).not.toBeCalled();
    expect(
      screen.getByText('File size is bigger then 50kB', { exact: false })
    ).toBeInTheDocument();
  });
});
