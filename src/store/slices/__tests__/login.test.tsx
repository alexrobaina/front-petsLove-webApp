import reducer, * as account from '../login';
import { initialState } from '../login';

describe('EXAMPLE account slice', () => {
  test('loginStart action', () => {
    const slice = reducer(initialState, account.loginStart());
    expect(slice.isLoading).toBe(true);
    expect(slice.error).toBe(false);
    expect(slice.data).toEqual({});
  });

  test('cleanErrors action', () => {
    const slice = reducer(initialState, account.cleanErrors());
    expect(slice.isLoading).toBe(false);
    expect(slice.error).toBe(false);
    expect(slice.data).toEqual({});
  });
});
