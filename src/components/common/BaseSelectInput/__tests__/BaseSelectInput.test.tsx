import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseSelectInput from '../BaseSelectInput';

const COUNTRIES = [
  { value: 'AR', label: 'ar' },
  { value: 'US', label: 'us' },
];

describe('<BaseLabel />', () => {
  const setFieldValue = jest.fn();
  const values = {
    issuerCountry: '',
  };

  const errors = {
    issuerCountry: '',
  };

  test.skip('Should component must render correctly', () => {
    const { getByTestId } = render(
      <BaseSelectInput
        label="País"
        marginTop={15}
        placeholder="País"
        options={COUNTRIES}
        testId="issuerCountry"
        inputName="issuerCountry"
        value={values.issuerCountry}
        setFieldValue={setFieldValue}
        errorMessage={errors.issuerCountry}
      />,
      {},
    );

    expect(getByTestId('react-select-issuerCountry')).toBeDefined();
  });
});
