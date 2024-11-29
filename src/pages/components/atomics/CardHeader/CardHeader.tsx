import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CardHeaderProps {
  headerTitle?: string;
  onPress?: () => void;
  onBack?: boolean;
}

const CardHeader = ({ headerTitle, onPress, onBack }: CardHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Row
      style={{ alignItems: 'center', display: 'flex', marginBottom: '16px' }}
    >
      <Col span={1}>
        {onBack && <ArrowLeftOutlined onClick={onPress ?? handleGoBack} />}
      </Col>
      <Col
        span={23}
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {headerTitle ?? t('family.header')}
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default CardHeader;
