import { Button, Result } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorResult: React.FC = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <Result
      status={404 || error.status}
      title={error.message}
      subTitle={error.message}
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate('/');
          }}
        >
          Back home
        </Button>
      }
    />
  );
};

export default ErrorResult;
