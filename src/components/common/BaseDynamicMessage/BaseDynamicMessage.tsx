import { FC, ReactElement, MouseEventHandler } from 'react';
import BaseButton from '../BaseButton';
import BaseText from '../BaseText';
import BaseTitle from '../BaseTitle';
import styles from './BaseDynamicMessage.module.scss';

interface IBaseDynamicMessage {
  title: string;
  testId: string;
  message?: string;
  textButton?: string;
  onClickButton?: Function;
  image?: ReactElement;
  textActionButton?: ReactElement;
  handleClose?: MouseEventHandler<HTMLDivElement>;
}

const BaseDynamicMessage: FC<IBaseDynamicMessage> = ({
  image,
  title,
  testId,
  message = '',
  onClickButton,
  textButton = '',
  textActionButton,
}) => {
  return (
    <div
      data-testid={`dynamic-message-${testId}`}
      style={{ justifyContent: !textActionButton ? 'none' : 'space-between' }}
      className={styles.container}
    >
      <div>
        {image}
        {title && (
          <BaseTitle center fontSize={24} marginTop={23} testId={testId} text={title} />
        )}
        {message && (
          <BaseText center fontSize={16} marginTop={8} testId={testId} text={message} />
        )}
        {textButton && (
          <div data-testid={`action-${testId}`} className={styles.action}>
            <BaseButton
              medium
              marginTop={16}
              testId={testId}
              onClick={onClickButton}
              text={textButton}
            />
          </div>
        )}
      </div>
      {textActionButton && (
        <div data-testid={`text-action-button-${testId}`} className={styles.actionText}>
          {textActionButton}
        </div>
      )}
    </div>
  );
};

export default BaseDynamicMessage;
