import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddNewRecordModal } from '../AddNewRecordModal';
import { render } from '../../../utils/test-utils';

vi.mock('@/hooks/useHumanPost', () => ({
  useHumanPost: () => ({
    mutate: vi.fn((data) => {
      console.log('Mutation data:', data);
      return Promise.resolve();
    }),
  }),
}));

describe('AddNewRecordModal', () => {
  it('is not showed when property isOpen equal to false', () => {
    render(<AddNewRecordModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Добавить запись')).not.toBeInTheDocument();
  });

  it('is showed when property isOpen equal to true', () => {
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Добавить запись')).toBeInTheDocument();
  });

  it('trigger onClose fn after cancelButton click', async () => {
    const onClose = vi.fn();
    render(<AddNewRecordModal isOpen={true} onClose={onClose} />);

    const cancelButton = screen.getByText('Отмена');
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows validation message', async () => {
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />);

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

    render(<AddNewRecordModal isOpen={true} onClose={onClose} />);

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
    render(<AddNewRecordModal isOpen={true} onClose={vi.fn()} />);

    const emailInput = screen.getByLabelText('Эл. почта');
    await userEvent.type(emailInput, 'foo bar');

    await userEvent.click(screen.getByLabelText('Имя'));

    await screen.findByText('Невалидный адрес электронной почты');
  });
});