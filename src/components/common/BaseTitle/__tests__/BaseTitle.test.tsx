import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseTitle from '../BaseTitle';

describe('<BaseTitle />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(<BaseTitle text="Texto de prueba" />, {});

    expect(getByText('Texto de prueba')).toBeDefined();
  });

  test('Should center text', () => {
    const { getByText }: any = render(<BaseTitle center text="Texto de prueba" />, {});

    const component = getByText('Texto de prueba');

    expect(component.className).toEqual('title center');
    expect(component).toBeDefined();
  });
});
