import React from 'react';
import { Card, Row, Col, Typography, Space, Tag, Button } from 'antd';
import { 
  MobileOutlined, 
  TabletOutlined, 
  DesktopOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const LayoutDemo: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          🎉 New Modern Layout Features
        </Title>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card 
              title={
                <Space>
                  <MobileOutlined style={{ color: '#1890ff' }} />
                  Mobile Responsive
                </Space>
              }
              hoverable
            >
              <Paragraph>
                <Text strong>Features:</Text>
              </Paragraph>
              <ul>
                <li>Collapsible mobile menu drawer</li>
                <li>Optimized touch targets</li>
                <li>Responsive typography</li>
                <li>Mobile-first design approach</li>
              </ul>
              <Tag color="green" icon={<CheckCircleOutlined />}>
                Fully Responsive
              </Tag>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card 
              title={
                <Space>
                  <TabletOutlined style={{ color: '#52c41a' }} />
                  Tablet Optimized
                </Space>
              }
              hoverable
            >
              <Paragraph>
                <Text strong>Features:</Text>
              </Paragraph>
              <ul>
                <li>Adaptive sidebar width</li>
                <li>Flexible content layout</li>
                <li>Touch-friendly navigation</li>
                <li>Optimized spacing</li>
              </ul>
              <Tag color="blue" icon={<StarOutlined />}>
                Adaptive Design
              </Tag>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card 
              title={
                <Space>
                  <DesktopOutlined style={{ color: '#722ed1' }} />
                  Desktop Enhanced
                </Space>
              }
              hoverable
            >
              <Paragraph>
                <Text strong>Features:</Text>
              </Paragraph>
              <ul>
                <li>Full sidebar navigation</li>
                <li>Enhanced header with user info</li>
                <li>Floating action buttons</li>
                <li>Professional footer</li>
              </ul>
              <Tag color="purple" icon={<StarOutlined />}>
                Professional UI
              </Tag>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col xs={24} lg={12}>
            <Card title="🎨 Design Improvements">
              <Paragraph>
                <Text strong>Modern Design Elements:</Text>
              </Paragraph>
              <ul>
                <li>Gradient backgrounds for visual appeal</li>
                <li>Smooth animations and transitions</li>
                <li>Consistent spacing and typography</li>
                <li>Professional color scheme</li>
                <li>Enhanced user avatars and badges</li>
                <li>Improved button and input styling</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="⚡ Performance & UX">
              <Paragraph>
                <Text strong>User Experience Enhancements:</Text>
              </Paragraph>
              <ul>
                <li>Responsive breakpoints for all devices</li>
                <li>Optimized loading states</li>
                <li>Intuitive navigation patterns</li>
                <li>Accessibility improvements</li>
                <li>Touch-friendly interface</li>
                <li>Consistent interaction feedback</li>
              </ul>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: '32px', textAlign: 'center' }}>
          <Col span={24}>
            <Space direction="vertical" size="large">
              <Title level={3}>🚀 Ready to Use!</Title>
              <Paragraph>
                The new layout is fully responsive and optimized for all devices. 
                Try resizing your browser window to see the responsive behavior in action.
              </Paragraph>
              <Space>
                <Button type="primary" size="large">
                  Explore Features
                </Button>
                <Button size="large">
                  View Documentation
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LayoutDemo;
