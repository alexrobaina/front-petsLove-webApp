import axios from 'axios';
import { BASE_URL } from '../config';
import { connectAccount } from '../account';

describe('EXAMPLE', () => {
  test.skip('Test account api', async () => {
    const result = {
      data: {
        status: 200,
        message: 'User created',
      },
    };
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { status: 200, message: 'User created' } }),
      );
    const resultApi = await connectAccount('asf');

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/users/register`, {
      account: 'alex@test.com',
    });

    expect(resultApi).toStrictEqual(result);
  });
});
