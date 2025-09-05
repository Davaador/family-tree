import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { SubmitButtonProps } from '../SubmitButton/SubmitButton';

const TextButton = (props: Readonly<SubmitButtonProps>) => {
  const { text, disabled, loading, onPress, block } = props;
  const { t } = useTranslation();
  return (
    <Button
      onClick={onPress && onPress}
      disabled={disabled}
      loading={loading}
      type='text'
      block={block}
    >
      {text ?? t('general.text')}
    </Button>
  );
};

export default TextButton;
