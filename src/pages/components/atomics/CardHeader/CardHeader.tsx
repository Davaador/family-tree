import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CardHeaderProps {
  headerTitle?: string;
  onPress?: () => void;
  onBack?: boolean;
  onAddClick?: () => void;
  addClickTitle?: string;
}

const CardHeader = React.memo(
  ({
    headerTitle,
    onPress,
    onBack,
    onAddClick,
    addClickTitle,
  }: CardHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    const handleClick = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        handleGoBack();
      }
    }, [onPress, handleGoBack]);

    return (
      <Row
        style={{ alignItems: 'center', display: 'flex', marginBottom: '16px' }}
      >
        <Col xs={4} sm={4} md={4} lg={4}>
          {onBack && <ArrowLeftOutlined onClick={handleClick} />}
        </Col>
        <Col
          xs={16}
          sm={16}
          md={16}
          lg={16}
          style={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography.Title
            level={5}
            style={{ margin: 0, textAlign: 'center' }}
          >
            {headerTitle ?? t('family.header')}
          </Typography.Title>
        </Col>
        <Col
          xs={24}
          sm={4}
          md={4}
          lg={4}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {onAddClick && (
            <Button
              size="small"
              onClick={onAddClick}
              style={{ fontSize: '12px', padding: '16px 6px' }}
            >
              {addClickTitle ?? 'Хүүхэд бүртгэх'}
            </Button>
          )}
        </Col>
      </Row>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
