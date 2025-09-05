import { Button, ButtonProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

export interface SubmitButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  block?: boolean;
}

const SubmitButton = (props: Readonly<SubmitButtonProps>) => {
  const { text, disabled, loading, onPress, block } = props;
  const { t } = useTranslation();
  return (
    <Button
      onClick={onPress && onPress}
      disabled={disabled}
      loading={loading}
      type='primary'
      htmlType='submit'
      block={block}
      size='large'
      {...props}
    >
      <Text strong color='dark'>
        {text ?? t('general.save')}
      </Text>
    </Button>
  );
};

export default SubmitButton;
