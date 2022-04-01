import { render, fireEvent } from '../../../../tests';
import BaseDynamicMessage from '../BaseDynamicMessage';

describe('<BaseDynamicMessage />', () => {
  test.skip('Should component must render correctly', () => {
    const handleCloseMock = jest.fn();
    const onClickButton = jest.fn();

    const { getByTestId } = render(
      <BaseDynamicMessage
        testId="test"
        textButton="common.tryAgain"
        onClickButton={onClickButton}
        handleClose={handleCloseMock}
        title="common.genericErrorMessage"
        message="common.genericErrorMessage"
      />,
      {},
    );

    const button: any = getByTestId('button-test');
    fireEvent.click(button);

    expect(button).toBeDefined();
    expect(onClickButton).toHaveBeenCalled();

    expect(getByTestId('clode-button-text-test')).toBeDefined();
    expect(getByTestId('text-test')).toBeDefined();
    expect(getByTestId('action-test')).toBeDefined();
    expect(getByTestId('button-test')).toBeDefined();
    expect(getByTestId('close-icon-test')).toBeDefined();
    expect(getByTestId('dynamic-message-test')).toBeDefined();
    expect(getByTestId('clode-button-text-test')).toBeDefined();
  });

  test('Should component must render correctly', () => {
    const handleCloseMock = jest.fn();
    const onClickButton = jest.fn();

    const { getByTestId } = render(
      <BaseDynamicMessage
        testId="test"
        textButton="common.tryAgain"
        handleClose={handleCloseMock}
        onClickButton={onClickButton}
        title="common.genericErrorMessage"
        message="common.genericErrorMessage"
        textActionButton={<div>Hola mundo</div>}
      />,
      {},
    );

    expect(getByTestId('text-action-button-test')).toBeDefined();
  });
});
