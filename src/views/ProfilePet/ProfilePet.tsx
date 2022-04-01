import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { SIGN_UP } from '../../navigation/routes/routes';
import Layout from '../../components/common/Layout';
import BaseButton from '../../components/common/BaseButton';

const ProfilePet: FC = () => {
  const history = useHistory();

  const goToRegister = () => {
    history.push(SIGN_UP);
  };

  return (
    <Layout testId="profile-pet">
      <div>
        profile pet
        <BaseButton text="register" onClick={goToRegister} />
      </div>
    </Layout>
  );
};

export default ProfilePet;
