import { testSaga } from 'redux-saga-test-plan';
import * as signUpActions from '../../slices/account';
import * as signUpSagasRoot from '../account';
import { axiosMock } from '../../../__mocks__/axiosMock';

describe('EXAMPLE sagas', () => {
  const dataMock = {
    payload: {
      address: '12csa',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.skip('EXPAMPLEWorker:', () => {
    test.skip('Should put accountStart action, call api and put accountSuccess action with payload', async () => {
      axiosMock.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      const accountSaga = testSaga(signUpSagasRoot.connectAcconuntWorker, dataMock);

      accountSaga
        .next()
        .put(signUpActions.accountStart())
        .next()
        .next()
        .put(signUpActions.accountSuccess({ message: undefined }))
        .next()
        .isDone();
    });
  });

  // t
});
