import { Col, ConfigProvider, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <Layout>
      <Content>
        <Row justify="center" align="middle" className="min-h">
          <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#65eaae",
                  borderRadius: 5,
                  colorBgContainer: "#f6ffed",
                },
              }}
            >
              <Outlet />
            </ConfigProvider>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default GuestLayout;
