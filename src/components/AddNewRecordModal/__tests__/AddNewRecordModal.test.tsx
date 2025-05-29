import { describe, it, expect, vi } from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddNewRecordModal } from '../AddNewRecordModal';
// import { render } from '../../../utils/test-utils';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";
import {ReactNode} from "react";

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

describe('AddNewRecordModal', () => {
  it('is not showed when property isOpen equal to false', () => {
    render(<AddNewRecordModal isOpen={false} onClose={vi.fn()} />, {
      wrapper: createWrapper()
    });
    expect(screen.queryByText('Добавить запись')).not.toBeInTheDocument();
  });

  it('is showed when property isOpen equal to true', () => {
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />, {
      wrapper: createWrapper()
    });
    expect(screen.getByText('Добавить запись')).toBeInTheDocument();
  });

  it('trigger onClose fn after cancelButton click', async () => {
    const onClose = vi.fn();
    render(<AddNewRecordModal isOpen={true} onClose={onClose} />, {
      wrapper: createWrapper()
    });

    const cancelButton = screen.getByText('Отмена');
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows validation message', async () => {
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />, {
      wrapper: createWrapper()
    });

    const submitButton = screen.getByText('ОК');
    await userEvent.click(submitButton);

    await screen.findByText('Пожалуйста, введите имя');
    await screen.findByText('Пожалуйста, введите фамилию');
    await screen.findByText('Пожалуйста, введите возраст');
    await screen.findByText('Пожалуйста, введите город');
    await screen.findByText('Пожалуйста, введите страну');
    await screen.findByText('Пожалуйста, введите электронную почту');
  });

  it('successfully post valid data', async () => {
    const onClose = vi.fn();

    render(<AddNewRecordModal isOpen={true} onClose={onClose} />, {
      wrapper: createWrapper()
    });

    await userEvent.type(screen.getByLabelText('Имя'), 'Максим');
    await userEvent.type(screen.getByLabelText('Фамилия'), 'Максимов');
    await userEvent.type(screen.getByLabelText('Возраст'), '18');
    await userEvent.type(screen.getByLabelText('Город'), 'Воронеж');
    await userEvent.type(screen.getByLabelText('Страна'), 'Россия');
    await userEvent.type(screen.getByLabelText('Эл. почта'), 'maksim09@mail.ru');

    const submitButton = screen.getByText('ОК');
    await userEvent.click(submitButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation message if incorrect email was entered', async () => {
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />, {
      wrapper: createWrapper()
    });

    const emailInput = screen.getByLabelText('Эл. почта');
    await userEvent.type(emailInput, 'foo bar');

    await userEvent.click(screen.getByLabelText('Имя'));

    await screen.findByText('Невалидный адрес электронной почты');
  });
});