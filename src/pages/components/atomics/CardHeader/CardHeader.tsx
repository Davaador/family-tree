import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CardHeaderProps {
  headerTitle?: string;
  onPress?: () => void;
  onBack?: boolean;
  onAddClick?: () => void;
  addClickTitle?: string;
}

const CardHeader = ({
  headerTitle,
  onPress,
  onBack,
  onAddClick,
  addClickTitle,
}: CardHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Row
      style={{ alignItems: 'center', display: 'flex', marginBottom: '16px' }}
    >
      <Col span={4}>
        {onBack && <ArrowLeftOutlined onClick={onPress ?? handleGoBack} />}
      </Col>
      <Col
        span={16}
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {headerTitle ?? t('family.header')}
        </Typography.Title>
      </Col>
      <Col span={4}>
        {onAddClick && (
          <Button size="small" onClick={onAddClick}>
            {addClickTitle ?? 'Хүүхэд бүртгэх'}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default CardHeader;
