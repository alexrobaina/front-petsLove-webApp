import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseNotifyMessage from '../BaseNotifyMessage';

describe('<BaseLabel />', () => {
  test('Should component must render correctly', () => {
    const { getByText, getByTestId }: any = render(
      <BaseNotifyMessage testId="test" message="Notify message" />,
      {},
    );

    expect(getByTestId('notify-test')).toBeDefined();
    expect(getByText('Notify message')).toBeDefined();
  });
});
