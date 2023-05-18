import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import useAutoLogin from '@/hooks/useAutoLogin';
import { renderHookWithProviders } from '@/utils/test/test-utils';

const mockGetData = vi.fn();
const mockAutoLogin = vi.fn();
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/utils', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/utils')),
  localStorageHelper: () => [vi.fn(), mockGetData]
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('react-router-dom')),
  useNavigate: () => mockNavigate
}));

vi.mock('@/features/auth/authStore', async () => ({
  ...(await vi.importActual<Record<string, unknown>>(
    '@/features/auth/authStore'
  )),
  useAutoLoginMutation: () => [mockAutoLogin]
}));

vi.mock('@/store', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/store')),
  useAppDispatch: () => mockDispatch
}));

vi.mock('@/store/userSlice', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/store/userSlice')),
  setUser: vi.fn().mockReturnValue('user')
}));

describe('useAutoLogin hook test', () => {
  beforeEach(() => {
    mockGetData.mockReset().mockReturnValue('token');
    mockAutoLogin.mockReset().mockResolvedValue({ data: { status: 200 } });
    mockDispatch.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should not call dispatch and setUser if token is not set', () => {
    mockGetData.mockReturnValue(null);
    renderHookWithProviders(() => useAutoLogin());

    waitFor(() => {
      expect(mockGetData).toBeCalledTimes(1);
      expect(mockAutoLogin).toBeCalledTimes(0);
      expect(mockDispatch).toBeCalledTimes(0);
    });
  });

  it('Should not call dispatch and setUser if response status is not 200', () => {
    mockAutoLogin.mockResolvedValue({ data: { status: 400 } });
    renderHookWithProviders(() => useAutoLogin());

    waitFor(() => {
      expect(mockGetData).toBeCalledTimes(1);
      expect(mockAutoLogin).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledTimes(0);
      expect(mockNavigate).toBeCalledWith('/');
    });
  });

  it('Should call dispatch and setUser if response status is 200', () => {
    renderHookWithProviders(() => useAutoLogin());

    waitFor(() => {
      expect(mockGetData).toBeCalledTimes(1);
      expect(mockAutoLogin).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledTimes(1);
    });
  });
});
