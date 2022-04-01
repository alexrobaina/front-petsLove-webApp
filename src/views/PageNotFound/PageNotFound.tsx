import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_UP } from '../../navigation/routes/routes';
import Layout from '../../components/common/Layout';
import BaseButton from '../../components/common/BaseButton';

const PageNotFound: FC = () => {
  const history = useHistory();

  const goToRegister = () => {
    history.push(SIGN_UP);
  };

  return (
    <Layout testId="create-pet">
      <div>
        asfas
        <BaseButton text="go to register" onClick={goToRegister} />
      </div>
    </Layout>
  );
};

export default PageNotFound;
