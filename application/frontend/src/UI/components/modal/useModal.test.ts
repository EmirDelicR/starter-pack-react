import { useRef } from 'react';

import { act, render, renderHook, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { useModal } from './useModal';

describe('useModal component/hook test', () => {
  const mockShowModal = vi.fn();
  const mockClose = vi.fn();

  beforeEach(() => {
    mockShowModal.mockReset();
    mockClose.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should return object with properties', () => {
    const { result } = renderHook(() => {
      const modalRef = useRef<HTMLDialogElement>(null);
      return useModal(modalRef);
    });

    expect(result.current).toHaveProperty('Modal');
    expect(result.current).toHaveProperty('closeModal');
    expect(result.current).toHaveProperty('openModal');
  });

  it('Should return Modal and render all elements', () => {
    const { result } = renderHook(() => {
      const modalRef = useRef<HTMLDialogElement>(null);
      return useModal(modalRef);
    });
    render(
      result.current.Modal({
        children: 'Childe component',
        modalHeader: 'Header'
      })
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Childe component')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('Should call open and close modal from ref object', () => {
    const { result } = renderHook(() => {
      const modalRef = useRef<HTMLDialogElement>(null);
      Object.defineProperty(modalRef, 'current', {
        get: () => ({
          showModal: mockShowModal,
          close: mockClose
        })
      });

      return useModal(modalRef);
    });

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(mockShowModal).toBeCalledTimes(1);
    expect(mockClose).toBeCalledTimes(1);
  });
});
