import { UsergroupAddOutlined } from '@ant-design/icons';
import { Card, Statistic, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface BirthOrderData {
  birthOrder: number;
  totalChildren: number;
}

interface BirthOrderCardProps {
  birthOrderData: BirthOrderData;
  className?: string;
}

const BirthOrderCard: React.FC<BirthOrderCardProps> = ({
  birthOrderData,
  className: _className,
}) => {
  const { t } = useTranslation();

  const getBirthOrderText = (order: number) => {
    if (order === 0) return t('dashboard.notAChild');
    if (order === 1) return t('dashboard.firstChild');
    if (order === 2) return t('dashboard.secondChild');
    if (order === 3) return t('dashboard.thirdChild');
    return t('dashboard.nthChild', { order });
  };

  return (
    <Card className='birth-order-card'>
      <div className='birth-order-content'>
        <div className='birth-order-icon'>
          <UsergroupAddOutlined />
        </div>

        <Statistic
          title={
            <Text className='birth-order-title'>
              {t('dashboard.birthOrder')}
            </Text>
          }
          value={birthOrderData.birthOrder}
          suffix={
            <Text className='birth-order-suffix'>
              {getBirthOrderText(birthOrderData.birthOrder)}
            </Text>
          }
          valueStyle={{
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold',
          }}
        />

        {birthOrderData.totalChildren > 0 && (
          <div className='birth-order-info'>
            <Text className='birth-order-description'>
              {t('dashboard.outOf')} {birthOrderData.totalChildren}{' '}
              {t('dashboard.children')}
            </Text>
          </div>
        )}

        {birthOrderData.birthOrder === 0 && (
          <div className='birth-order-info'>
            <Text className='birth-order-description'>
              {t('dashboard.parentOrNotChild')}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BirthOrderCard;
