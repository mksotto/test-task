import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useInfinityHumans } from '../useInfinityHumans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactNode} from "react";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useInfinityHumans', () => {
  it('successfully load first page', async () => {
    const { result } = renderHook(() => useInfinityHumans(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data?.pages[0].data).toBeDefined();
    });

    const firstPage = result.current.data?.pages[0];
    expect(firstPage?.data).toHaveLength(2);
    expect(firstPage?.data[0]).toEqual({
      id: 'bd78ef41-e96f-4234-86b9-67d0e3eebecf',
      firstName: 'Иван',
      lastName: 'Иванов',
      age: 25,
      city: 'Москва',
      country: 'Россия',
      email: 'ivan@example.com'
    });
  });

  it('pagination should work correctly', async () => {
    const { result } = renderHook(() => useInfinityHumans(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data?.pages[0].data).toBeDefined();
    });

    expect(result.current.hasNextPage).toBe(false);
  });
}); 