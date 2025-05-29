import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { LayoutWrapper } from '../LayoutWrapper';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={ruRU}>
          {children}
        </ConfigProvider>
      </QueryClientProvider>
  );
};

describe('LayoutWrapper', () => {
  it('shows a header "Профильное задание"', () => {
    render(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>, {
      wrapper: createWrapper()
    });
    expect(screen.getByText('Профильное задание')).toBeInTheDocument();
  });

  it('shows an GitHub icon with link to repository', () => {
    render(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>, {
        wrapper: createWrapper()
    });
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/mksotto/test-task');
  });

  it('shows children', () => {
    const testContent = 'Текст';
    render(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>, {
        wrapper: createWrapper()
    });
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('includes VK and GitHub logo', () => {
    render(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>, {
        wrapper: createWrapper()
    });
    expect(document.querySelectorAll('svg').length).toBe(2);
  });
}); 