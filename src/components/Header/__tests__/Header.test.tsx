import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../tests';
import Header from '../Header';

describe('<Header />', () => {
  test.skip('Should component must render correctly', () => {
    const changeTheme = () => {};
    const setLanguage = () => {};
    const { getByTestId }: any = render(
      <Header setLanguage={setLanguage} changeTheme={changeTheme} theme="light" />,
      {},
    );

    const component = getByTestId('header-app');

    expect(component.className).toEqual('header');
  });
});
