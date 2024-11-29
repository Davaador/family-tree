import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  notification,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from 'antd';
import { RequestListProps } from 'pages/private/private.model';
import {
  deleteActiveUser,
  updateActiveUser,
} from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
const RequestList = () => {
  const { t } = useTranslation();
  const { requests } = useLoaderData() as RequestListProps;
  const [requestLists, setRequestLists] = useState<CustomerDetail[]>(
    requests.data
  );
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    setRequestLists(requests.data);
  }, [requests]);

  function onChangePagination(page: number, perPage: number) {
    navigate(`/requests?page=${page - 1}&perPage=${perPage}`);
  }

  const deleteUser = (id: number) => {
    deleteActiveUser(id).then(() => {
      notification.success({
        message: t('request.notification.success'),
        description: t('request.notification.deleteMessage'),
      });
      navigate(location.pathname + location.search, { replace: true });
    });
  };

  const approveUser = (id: number) => {
    updateActiveUser(id)
      .then(() => {
        notification.success({
          message: t('request.notification.success'),
          description: t('request.notification.sucessMessage'),
        });
        navigate(location.pathname + location.search, { replace: true });
      })
      .catch(() => {});
  };

  const columns: TableProps<CustomerDetail>['columns'] = [
    {
      title: t('register.lastName'),
      dataIndex: ['customer', 'lastName'],
      key: 'customer.lastName',
      width: '20%',
    },
    {
      title: t('profile.firstName'),
      dataIndex: ['customer', 'firstName'],
      key: 'firstName',
      width: '20%',
    },
    {
      title: t('register.phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '20%',
    },
    {
      title: t('register.registerNumber'),
      dataIndex: ['customer', 'register'],
      key: 'register',
      width: '25%',
    },
    {
      title: t('request.settings'),
      dataIndex: 'approve',
      key: 'approve',
      width: '15%',
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title={t('request.approveTitle')}
            description={t('request.approveDesc')}
            okText={t('general.ok')}
            cancelText={t('general.cancel')}
            onConfirm={() => approveUser(record.id)}
          >
            <Button
              shape="circle"
              type="text"
              icon={<EditTwoTone twoToneColor={'#65eaae'} />}
            />
          </Popconfirm>
          <Popconfirm
            title={t('request.deleteTitle')}
            description={t('request.deleteDesc')}
            okText={t('general.ok')}
            cancelText={t('general.cancel')}
            onConfirm={() => deleteUser(record.id)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              shape="circle"
              type="text"
              icon={<DeleteTwoTone twoToneColor={'#65eaae'} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={requestLists}
        rowKey={(key) => key.id}
        bordered
        scroll={{ x: '100%' }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['2', '1', '10', '15', '30'],
          locale: { items_per_page: t('general.perPage') },
          current: requests.currentPage + 1,
          pageSize: requests.perPage,
          total: requests.total,
          onChange: onChangePagination,
        }}
      />
    </Card>
  );
};

export default RequestList;
