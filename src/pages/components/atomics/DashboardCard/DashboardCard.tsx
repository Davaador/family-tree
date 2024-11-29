import { Col, Space, Row, Typography, theme } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
import React from 'react';

interface DashboardCardProps {
  value: number | string;
  title?: string;
  type?: BaseType;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  value,
  title,
  type,
}) => {
  const { token } = theme.useToken();
  return (
    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
      <Space
        direction="vertical"
        size="small"
        className="dashboard-container"
        style={{ boxShadow: token.boxShadow }}
      >
        <Row>
          <Typography.Text
            className="dashboard-label-text"
            type={type ?? 'secondary'}
          >
            {title ?? 'Нийт бүртгүүлсэн тоо'}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text className="dashboard-count-text">
            {value}
          </Typography.Text>
        </Row>
      </Space>
    </Col>
  );
};

export default DashboardCard;
