import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseImage from '../BaseImage';

describe('<BaseImage />', () => {
  test('Should component must render correctly', () => {
    const { getByTestId }: any = render(<BaseImage src="the_url" />, {});

    const image = getByTestId('image');

    expect(image).toHaveAttribute('src', 'the_url');
  });

  test('Should show left', () => {
    const { getByTestId }: any = render(<BaseImage src="the_url" />, {});

    const image = getByTestId('image');

    expect(image).toHaveAttribute('src', 'the_url');
  });
});
