import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import BaseButton from '../../../../components/common/BaseButton';
import { useTranslate } from '../../../../hooks/useTranslate';
import { CREATE_PET, EDIT_PROFILE } from '../../../../navigation/routes/routes';
import styles from './ActionsButtons.module.scss';

const ActionsButtons: FC = () => {
  const { t } = useTranslate();
  const history = useHistory();

  const createPet = () => history.push(CREATE_PET);
  const editProfile = () => history.push(EDIT_PROFILE);

  return (
    <div className={styles.actionCreateNewPet}>
      <BaseButton onClick={createPet} marginTop={50} text={t('dashboard.createPet')} />
      <BaseButton
        marginTop={50}
        onClick={editProfile}
        text={t('dashboard.editProfile')}
      />
    </div>
  );
};

export default ActionsButtons;
