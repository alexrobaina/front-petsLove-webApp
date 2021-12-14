import { testSaga } from 'redux-saga-test-plan';
import * as loginActions from '../../slices/login';
import * as loginSagasRoot from '../login';
import { axiosMock } from '../../../__mocks__/axiosMock';

describe('EXAMPLE sagas', () => {
  const dataMock = {
    payload: {
      email: '12csa',
      password: '12csa',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.skip('EXPAMPLEWorker:', () => {
    test.skip('Should put loginStart action, call api and put loginSuccess action with payload', async () => {
      axiosMock.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      const loginSaga = testSaga(loginSagasRoot.loginWorker, dataMock);

      loginSaga
        .next()
        .put(loginActions.loginStart())
        .next()
        .next()
        .put(loginActions.loginSuccess({ message: undefined }))
        .next()
        .isDone();
    });
  });

  // t
});
