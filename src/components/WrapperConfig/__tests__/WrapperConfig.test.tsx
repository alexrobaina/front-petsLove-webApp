import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../tests/test-utils';
import WrapperConfig from '../WrapperConfig';

describe('<WrapperConfig />', () => {
  test('Should component must render correctly', () => {
    const { getByTestId }: any = render(
      <WrapperConfig>
        <div>hi</div>
      </WrapperConfig>,
      {},
    );

    expect(getByTestId('wrapperConfig-app')).toBeDefined();
  });
});
