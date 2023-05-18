import { screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as userStoreSlice from '@/store/userSlice/userStoreSlice';
import { renderWithProviders } from '@/utils/test/test-utils';

import { Navigation } from './Navigation';

const mockUseMediaQuery = vi.fn();

vi.mock('@/hooks/useMediaQuery', () => ({
  default: () => mockUseMediaQuery
}));

describe('<Navigation/>', () => {
  const selectIsUserLoggedInSpy = vi.spyOn(
    userStoreSlice,
    'selectIsUserLoggedIn'
  );

  beforeEach(() => {
    selectIsUserLoggedInSpy.mockReturnValue(false);
    mockUseMediaQuery.mockReturnValue(false);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render login and home in navigation if user is not login in', () => {
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should not render element in navigation if user is not login in and is mobile', () => {
    mockUseMediaQuery.mockReturnValue(true);
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render additional links if user is login in', () => {
    selectIsUserLoggedInSpy.mockReturnValue(true);
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('should render additional links if user is login in and is mobile', () => {
    selectIsUserLoggedInSpy.mockReturnValue(true);
    mockUseMediaQuery.mockReturnValue(true);
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
