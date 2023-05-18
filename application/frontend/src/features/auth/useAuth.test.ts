import { ChangeEvent, MouseEvent } from 'react';

import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { IUserResponse } from '@/store/userSlice';
import * as formValidatorsUtils from '@/utils/formValidators/formValidators';

import useAuth from './useAuth';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/store', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/store')),
  useAppDispatch: () => mockDispatch
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('react-router-dom')),
  useNavigate: () => mockNavigate
}));

describe('useAuth hook test', () => {
  const mockOnSubmit = vi.fn();
  const onInputChangeSpy = vi.spyOn(formValidatorsUtils, 'onInputChange');

  beforeEach(() => {
    mockOnSubmit.mockReset();
    mockDispatch.mockReset();
    onInputChangeSpy.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return properties', () => {
    const { result } = renderHook(() => useAuth(mockOnSubmit, undefined));

    expect(result.current).toHaveProperty('email');
    expect(result.current).toHaveProperty('password');
    expect(result.current).toHaveProperty('isButtonDisabled');
    expect(result.current).toHaveProperty('onEmailChange');
    expect(result.current).toHaveProperty('onPasswordChange');
    expect(result.current).toHaveProperty('handleFormSubmit');
    expect(result.current.email).toEqual({ value: '', isValid: false });
    expect(result.current.password).toEqual({ value: '', isValid: false });
  });

  it('should call utils functions onInputChange for email', () => {
    const { result } = renderHook(() => useAuth(mockOnSubmit, undefined));

    result.current.onEmailChange({
      target: { value: 'test' }
    } as ChangeEvent<HTMLInputElement>);

    expect(onInputChangeSpy).toBeCalledWith(
      'test',
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should call utils functions on Input change for password', () => {
    const { result } = renderHook(() => useAuth(mockOnSubmit, undefined));

    result.current.onPasswordChange({
      target: { value: 'test' }
    } as ChangeEvent<HTMLInputElement>);

    expect(onInputChangeSpy).toBeCalledWith(
      'test',
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should call utils functions on Input change for password but only with two arguments', () => {
    const { result } = renderHook(() =>
      useAuth(mockOnSubmit, undefined, false)
    );

    result.current.onPasswordChange({
      target: { value: 'test' }
    } as ChangeEvent<HTMLInputElement>);

    expect(onInputChangeSpy).toBeCalledWith('test', expect.any(Function));
  });

  it('should call on submit', () => {
    const { result } = renderHook(() => useAuth(mockOnSubmit, undefined));

    result.current.handleFormSubmit({
      preventDefault: () => undefined
    } as MouseEvent<HTMLButtonElement>);

    expect(mockOnSubmit).toBeCalledWith({ email: '', password: '' });
  });

  it('should call dispatch if response status is 200', () => {
    renderHook(() => useAuth(mockOnSubmit, { status: 200 } as IUserResponse));

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('/');
  });

  it('should call dispatch if response status is 201', () => {
    renderHook(() => useAuth(mockOnSubmit, { status: 201 } as IUserResponse));

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('/');
  });
});
