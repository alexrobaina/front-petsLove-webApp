import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import BaseButton from '../../../../components/common/BaseButton';
import { useTranslate } from '../../../../hooks/useTranslate';
import { CREATE_PET, EDIT_USER } from '../../../../navigation/routes/routes';
import styles from './ActionsButtons.module.scss';

const ActionsButtons: FC = () => {
  const { t } = useTranslate();
  const history = useHistory();

  const createPet = () => window.location.replace(CREATE_PET);
  const editProfile = () => history.push(EDIT_USER);

  return (
    <div className={styles.actionCreateNewPet}>
      <BaseButton onClick={createPet} marginBottom={40} text={t('dashboard.createPet')} />
      <BaseButton
        marginBottom={40}
        onClick={editProfile}
        text={t('dashboard.editProfile')}
      />
    </div>
  );
};

export default ActionsButtons;
