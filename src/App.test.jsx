import {
  render,
  screen,
  fireEvent,
  act,
  logRoles,
  within,
} from '@testing-library/react';

import App from './App';
import * as waitMock from './helpers/wait.js';

const waitSpy = jest.spyOn(waitMock, 'wait');

describe('App', () => {
  it('should test logTestingPlaygroundURL', () => {
    const { baseElement } = render(<App />);

    // screen.logTestingPlaygroundURL();
    logRoles(baseElement);
  });

  it('should test within', () => {
    render(<App />);
    // const form = screen.getByRole('form');
    const form = screen.getByTestId('form');
    const userNameInput = within(form).getByLabelText(/User name/);
    const passwordInput = within(form).getByLabelText(/Password/);
    const submitButton = within(form).getByRole('button', {
      name: /Create user/,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should render App with form elements and a title', () => {
    const { container } = render(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordNameInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });
    const title = container.querySelector('h1');

    expect(userNameInput).toBeInTheDocument();
    expect(passwordNameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('should render error message when form was submit with a weak password', async () => {
    render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordNameInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters long/,
    );

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'John' } });
      fireEvent.change(passwordNameInput, { target: { value: '123' } });
      fireEvent.click(submitButton);
    });

    const errorMessageAfterSubmit = await screen.findByText(
      /Password must be at least 8 characters long/,
    );
    expect(errorMessageAfterSubmit).toBeInTheDocument();
  });

  it('should render success message after successful submit', async () => {
    render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordNameInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters long/,
    );

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    const promise = Promise.resolve();

    waitSpy.mockImplementationOnce(() => promise);

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'John' } });
      fireEvent.change(passwordNameInput, { target: { value: 'Esc#45Vdr@8' } });
      fireEvent.click(submitButton);
    });

    const successMessageAfterSubmit = await screen.findByText(
      /created with password/,
    );
    expect(successMessageAfterSubmit).toBeInTheDocument();
  });
});
