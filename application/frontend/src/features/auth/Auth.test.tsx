import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Auth from './Auth';

vi.mock('@/features/auth/signin/SignInForm', () => ({
  default: () => 'Sign in form'
}));

vi.mock('@/features/auth/signup/SignUpForm', () => ({
  default: () => 'Sign up form'
}));

describe('<Auth/>', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      render(<Auth />);

      expect(screen.getByText('Already have an account?')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Do not have an account?')).toBeInTheDocument();
      expect(screen.getByText('Create account')).toBeInTheDocument();
      expect(screen.getByText('Sign in form')).toBeInTheDocument();
      expect(screen.getByText('Sign up form')).toBeInTheDocument();
    });
  });
});
