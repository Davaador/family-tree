import { Layout, Table } from 'antd';
import { CardHeader } from 'pages/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AddCustomerList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout className="layout-transparent">
      <CardHeader
        headerTitle={t('admin.add.customerList.header')}
        onAddClick={() => {
          navigate('/admin/add/customer');
        }}
        addClickTitle={t('admin.add.buttonTitle')}
      />
      <Table bordered scroll={{ x: '100%' }} />
    </Layout>
  );
};

export default AddCustomerList;
