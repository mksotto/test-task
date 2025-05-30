import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import { LayoutWrapper } from '../LayoutWrapper';
import {renderComponentWithWrapper} from "@/utils/test-utils/renderWithWrapper.tsx";

describe('LayoutWrapper', () => {
  it('shows a header "Профильное задание"', () => {
    renderComponentWithWrapper(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>
    );
    expect(screen.getByText('Профильное задание')).toBeInTheDocument();
  });

  it('shows an GitHub icon with link to repository', () => {
    renderComponentWithWrapper(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/mksotto/test-task');
  });

  it('shows children', () => {
    const testContent = 'Текст';
    renderComponentWithWrapper(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('includes VK and GitHub logo', () => {
    renderComponentWithWrapper(
      <LayoutWrapper>
        <div>Текст</div>
      </LayoutWrapper>
    );
    expect(document.querySelectorAll('svg').length).toBe(2);
  });
}); 