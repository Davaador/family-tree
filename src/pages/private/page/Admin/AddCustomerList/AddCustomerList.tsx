import { notification, Layout, Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { CustomerModel } from 'types/customer.types';
import { getAdminList, deleteAdmin } from 'context/services/admin.service';
import { CardHeader } from 'pages/components';
import { useApi, useTable } from 'hooks';
import { formatDate } from 'utils';
import { TABLE_PAGE_SIZES } from 'constants/app';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminDetailModal from './AdminDetailModal';

const AddCustomerList = React.memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleTableChange } = useTable();
  const [adminList, setAdminList] = useState<CustomerModel.AdminCustomer[]>([]);
  const [selectedAdmin, setSelectedAdmin] =
    useState<CustomerModel.AdminCustomer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, execute: fetchAdminList } = useApi<
    CustomerModel.AdminCustomer[]
  >({
    onSuccess: (data) => {
      setAdminList(data);
      console.log('Admin list loaded:', data);
    },
  });

  const { loading: deleteLoading, execute: handleDelete } = useApi<void>({
    onSuccess: () => {
      notification.success({
        message: t('admin.success.title'),
        description: t('admin.delete.success'),
      });
      fetchAdminList(() => getAdminList());
    },
  });

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchAdminData = useCallback(() => {
    fetchAdminList(() => getAdminList());
  }, [fetchAdminList]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Memoize action handlers
  const handleViewAdmin = useCallback((record: CustomerModel.AdminCustomer) => {
    setSelectedAdmin(record);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedAdmin(null);
  }, []);

  const handleEditAdmin = useCallback(
    (record: CustomerModel.AdminCustomer) => {
      navigate(`/admin/edit/customer/${record.id}`);
    },
    [navigate]
  );

  const handleDeleteAdmin = useCallback(
    (id: number) => {
      handleDelete(() => deleteAdmin(id));
    },
    [handleDelete]
  );

  const handleAddClick = useCallback(() => {
    navigate('/admin/add/customer');
  }, [navigate]);

  // Memoize columns to prevent re-creation on every render
  const columns = useMemo(
    () => [
      {
        title: '№',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: 'Овог',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 120,
        sorter: true,
      },
      {
        title: 'Нэр',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 120,
        sorter: true,
      },
      {
        title: 'Ургийн овог',
        dataIndex: 'surName',
        key: 'surName',
        width: 120,
      },
      {
        title: 'Утас',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 120,
      },
      {
        title: 'И-мэйл',
        dataIndex: 'email',
        key: 'email',
        width: 180,
      },
      {
        title: 'Төрсөн огноо',
        dataIndex: 'birthDate',
        key: 'birthDate',
        width: 120,
        render: (date: string) => formatDate(date),
        sorter: true,
      },
      {
        title: 'Нас',
        dataIndex: 'age',
        key: 'age',
        width: 80,
        sorter: true,
      },
      {
        title: 'Регистрийн дугаар',
        dataIndex: 'register',
        key: 'register',
        width: 150,
      },
      {
        title: 'Үйлдэл',
        key: 'action',
        width: 120,
        fixed: 'right' as const,
        render: (_: any, record: CustomerModel.AdminCustomer) => (
          <Space size="small">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewAdmin(record)}
              title="Дэлгэрэнгүй харах"
            />
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditAdmin(record)}
              title="Засах"
            />
            <Popconfirm
              title={t('admin.delete.title')}
              description={t('admin.delete.description')}
              onConfirm={() => handleDeleteAdmin(record.id)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                loading={deleteLoading}
                title="Устгах"
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t, handleViewAdmin, handleEditAdmin, handleDeleteAdmin, deleteLoading]
  );

  // Memoize pagination config
  const paginationConfig = useMemo(
    () => ({
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} / ${total} админ`,
      pageSizeOptions: TABLE_PAGE_SIZES,
      defaultPageSize: 10,
    }),
    []
  );

  return (
    <Layout className="layout-transparent">
      <CardHeader
        headerTitle={t('admin.add.customerList.header')}
        onAddClick={handleAddClick}
        addClickTitle={t('admin.add.buttonTitle')}
      />
      <Table
        bordered
        scroll={{ x: '100%' }}
        columns={columns}
        dataSource={adminList}
        loading={loading}
        rowKey="id"
        onChange={handleTableChange}
        pagination={paginationConfig}
      />

      {/* Admin Detail Modal */}
      <AdminDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        admin={selectedAdmin}
      />
    </Layout>
  );
});

AddCustomerList.displayName = 'AddCustomerList';

export default AddCustomerList;
