import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseLoading from '../BaseLoading';

describe('<BaseButton />', () => {
  test('Should disabled button', () => {
    const { getByTestId }: any = render(<BaseLoading testId="test" />, {});

    expect(getByTestId('loading-test')).toBeDefined();
  });
});
