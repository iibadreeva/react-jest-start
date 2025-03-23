import { renderHook, act } from '@testing-library/react';

import { useCreateUser } from '../use-create-user.js';
import { passwordValidationErrors } from '../../constants/validation.js';

describe('useCreateUser', () => {
  it('should return an object with correct properties', () => {
    // renderHook(() => useCreateUser()); // когда передаем что-то в хук
    const { result } = renderHook(useCreateUser);

    expect(result.current).toHaveProperty('successMessage');
    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('onSuccess');
    expect(result.current).toHaveProperty('onError');

    expect(typeof result.current.successMessage).toBe('string');
    expect(typeof result.current.errorMessage).toBe('string');
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.onSuccess).toBe('function');
    expect(typeof result.current.onError).toBe('function');
  });

  it('should set the success message', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.successMessage).toBe('');

    act(() => {
      result.current.onSuccess({ name: 'Inna', password: 'Qwer!123@sd' });
    });

    expect(result.current.successMessage).toBe(
      `User Inna created with password Qwer!123@sd`,
    );
  });

  it('should set the error message', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onError(new Error('Invalid password'));
    });

    expect(result.current.errorMessage).toBe(`Invalid password`);
  });

  it('should throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(result.current.onSubmit({ password: '123' })).rejects.toThrow(
      passwordValidationErrors.length,
    );
  });

  it('should not throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(
      result.current.onSubmit({ password: 'Qwer!123@sd' }),
    ).resolves.toBe();
  });
});
