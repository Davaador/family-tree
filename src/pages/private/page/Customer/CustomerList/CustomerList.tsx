import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  TableProps,
  Typography,
  Space,
  Tag,
  Avatar,
  Tooltip,
} from 'antd';
import {
  CustomerListData,
  CustomerListProps,
} from 'pages/private/private.model';
import { getActiveCustomerList } from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './CustomerList.css';
import { useForm } from 'antd/es/form/Form';
import { CustomFormItem } from 'pages/components';
import dayjs from 'dayjs';
import {
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import CustomerDetailModal from './CustomerDetailModal';

const CustomerList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { customers } = useLoaderData() as CustomerListProps;
  const [totalSize, setTotalSize] = useState<CustomerListData>(customers);
  const navigate = useNavigate();
  const [form] = useForm();
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetail | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTotalSize(customers);
  }, [customers]);

  function onChangePagination(page: number, perPage: number) {
    navigate(`/customers?page=${page - 1}&perPage=${perPage}`);
  }

  const handleViewDetails = (customer: CustomerDetail) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCustomer(null);
  };

  const getGenderColor = (gender: string) => {
    return gender === '0' ? '#3183B8' : '#D03FC6';
  };

  const getGenderText = (gender: string) => {
    return gender === '0' ? 'Эрэгтэй' : 'Эмэгтэй';
  };

  const columns: TableProps<CustomerDetail>['columns'] = [
    {
      title: '№',
      width: '5%',
      key: 'id',
      render: (_text: string, _record: any, index: number) =>
        customers.currentPage * customers.perPage + index + 1,
    },
    {
      title: t('register.lastName'),
      dataIndex: 'lastName',
      key: 'lastName',
      width: '15%',
      render: (text: string, record: CustomerDetail) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            style={{ backgroundColor: '#65eaae' }}
            icon={<UserOutlined />}
          />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.firstName}</div>
          </div>
        </div>
      ),
    },
    {
      title: t('register.phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <PhoneOutlined style={{ color: '#65eaae' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: t('register.registerNumber'),
      dataIndex: 'register',
      key: 'register',
      width: '20%',
      render: (text: string) => (
        <Tag color="#65eaae" style={{ border: 'none' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Хүйс',
      dataIndex: 'gender',
      key: 'gender',
      width: '10%',
      render: (gender: string) => (
        <Tag color={getGenderColor(gender)} style={{ border: 'none' }}>
          {getGenderText(gender)}
        </Tag>
      ),
    },
    {
      title: t('register.birthday'),
      dataIndex: 'birthDate',
      key: 'birthDate',
      width: '15%',
      render: (date) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined style={{ color: '#65eaae' }} />
          <span>{date ? dayjs(date).format('YYYY-MM-DD') : '-'}</span>
        </div>
      ),
      sorter: (a, b) => {
        const dateA = a.birthDate ? dayjs(a.birthDate).valueOf() : 0;
        const dateB = b.birthDate ? dayjs(b.birthDate).valueOf() : 0;
        return dateA - dateB;
      },
    },
    {
      title: 'Үйлдэл',
      key: 'action',
      width: '10%',
      render: (_: any, record: CustomerDetail) => (
        <Space size="small">
          <Tooltip title="Дэлгэрэнгүй харах">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              style={{ color: '#65eaae' }}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchData(
      pagination.pageSize,
      pagination.current - 1,
      sorter.order === 'ascend' ? 1 : 0
    );
  };

  const fetchData = (
    size: number,
    page: number,
    isSortAscending: number,
    searchLabel?: string,
    searchValue?: string
  ) => {
    setLoading(true);
    getActiveCustomerList(size, page, isSortAscending, searchLabel, searchValue)
      .then((res: CustomerListData) => {
        setTotalSize(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSearch = (values: { label: string; value: string }) => {
    console.log(values, 'ss');
    fetchData(10, 0, 1, values.label, values.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Харилцагчдын жагсаалт
          </h1>
          <p className="text-gray-600">
            Бүртгэлтэй харилцагчдын мэдээллийг харах, удирдах
          </p>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 rounded-2xl">
          {/* Search Section */}
          <Row gutter={[12, 12]} className="mb-6">
            <Col xs={24} sm={12}>
              <Form
                form={form}
                className="flex justify-between h-10"
                onFinish={onSearch}
                initialValues={{ label: 'phoneNumber' }}
              >
                <CustomFormItem name={'label'} className="w-1/3">
                  <Select
                    options={[
                      { value: 'phoneNumber', label: 'Утасны дугаар' },
                      { value: 'lastName', label: 'Овог' },
                      { value: 'firstName', label: 'Нэр' },
                    ]}
                  />
                </CustomFormItem>
                <CustomFormItem name={'value'} className="w-1/3">
                  <Input placeholder="Хайх утга" />
                </CustomFormItem>
                <Button
                  size="middle"
                  type="primary"
                  className="h-10"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ backgroundColor: '#65eaae', borderColor: '#65eaae' }}
                >
                  <Typography.Text>Хайх</Typography.Text>
                </Button>
              </Form>
            </Col>
          </Row>

          {/* Table */}
          <Table
            dataSource={totalSize.content}
            columns={columns}
            bordered
            scroll={{ x: '100%' }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ['10', '15', '30'],
              locale: { items_per_page: t('general.perPage') },
              current: totalSize.number + 1,
              pageSize: totalSize.perPage,
              total: totalSize.totalElements,
              onChange: onChangePagination,
            }}
            rowKey={'id'}
            onChange={handleTableChange}
            loading={loading}
            className="customer-table"
          />
        </Card>

        {/* Detail Modal */}
        <CustomerDetailModal
          visible={modalVisible}
          onClose={handleCloseModal}
          customer={selectedCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerList;
