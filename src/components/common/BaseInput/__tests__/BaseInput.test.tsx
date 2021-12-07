import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseInput from '../BaseInput';

describe('<BaseInput />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(
      <BaseInput placeholder="Input test" inputName="test" label="email" />,
      {},
    );

    expect(getByText('email')).toBeDefined();
  });

  test('Should render icons password', () => {
    const { getByTestId }: any = render(
      <BaseInput
        label="email"
        type="password"
        inputName="test"
        placeholder="Input test"
      />,
      {},
    );

    expect(getByTestId('show-icon-password')).toBeDefined();
  });

  test('Should render error message', () => {
    const { getByText } = render(
      <BaseInput
        label="email"
        type="password"
        inputName="test"
        placeholder="Input test"
        errorMessage="email error"
      />,
      {},
    );

    expect(getByText('email error')).toBeDefined();
  });

  test('Should render error message', () => {
    const { getByTestId } = render(
      <BaseInput
        disabled
        label="email"
        testId="email"
        inputName="test"
        placeholder="Input test"
        errorMessage="email error"
      />,
      {},
    );

    expect(getByTestId('baseInput-email-test-input')).toBeDisabled();
  });
});
