import axios from 'axios';
import { BASE_URL } from '../config';

describe('Login', () => {
  test.skip('Test account api', async () => {
    // const result = {
    //   data: {
    //     status: 200,
    //     message: 'User created',
    //   },
    // };
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { status: 200, message: 'Login' } }),
      );
    // const resultApi = await login('asf');

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/user/`, {
      account: 'alex@test.com',
    });

    // expect(resultApi).toStrictEqual(result);
  });
});
