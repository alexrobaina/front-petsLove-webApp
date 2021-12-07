import reducer, * as account from '../account';
import { initialState } from '../account';

describe('EXAMPLE account slice', () => {
  const payloadMock = {
    payload: {
      data: {},
    },
  };

  test('accountStart action', () => {
    const slice = reducer(initialState, account.accountStart());
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
