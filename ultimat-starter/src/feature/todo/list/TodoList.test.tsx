import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';
import { renderWithProviders } from '@/utils/test-utils';
import TodoList from './TodoList';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('react-router')),
  useNavigate: () => mockNavigate,
}));

describe('<TodoList/>', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      renderWithProviders(<TodoList />);

      expect(screen.getAllByTestId('list-item').length).toBe(5);
    });

    it('should navigate to details page', async () => {
      renderWithProviders(<TodoList />);
      const firstItem = screen.getAllByTestId('list-item')[0]!;
      await userEvent.click(firstItem);
      expect(mockNavigate).toHaveBeenCalledWith('/work/1');
    });
  });
});
