import { ConfigProvider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#65eaae',
              borderRadius: 5,
              colorBgContainer: '#f6ffed',
            },
          }}
        >
          <Outlet />
        </ConfigProvider>
      </Content>
    </Layout>
  );
};

export default GuestLayout;
