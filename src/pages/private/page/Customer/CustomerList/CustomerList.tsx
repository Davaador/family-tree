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

const CustomerList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { customers } = useLoaderData() as CustomerListProps;
  const [totalSize, setTotalSize] = useState<CustomerListData>(customers);
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    // setCustomerLists(customers.data);
    setTotalSize(customers);
  }, [customers]);

  function onChangePagination(page: number, perPage: number) {
    navigate(`/customers?page=${page - 1}&perPage=${perPage}`);
  }

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
      width: '20%',
    },
    {
      title: t('profile.firstName'),
      dataIndex: 'firstName',
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
      dataIndex: 'register',
      key: 'register',
      width: '25%',
    },
    {
      title: t('register.age'),
      dataIndex: 'age',
      key: 'age',
      width: '25%',
      sorter: (a, b) => a.age - b.age,
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
    <Card>
      <Row gutter={[12, 12]} className="mb-8">
        <Col xs={24} sm={12}>
          <Form
            form={form}
            className="flex justify-between h-8"
            onFinish={onSearch}
            initialValues={{ label: 'phoneNumber' }}
          >
            <CustomFormItem name={'label'} className="w-1/3">
              <Select
                options={[{ value: 'phoneNumber', label: 'Утасны дугаар' }]}
              ></Select>
            </CustomFormItem>
            <CustomFormItem name={'value'} className="w-1/3">
              <Input placeholder="Хайх утга" />
            </CustomFormItem>
            <Button
              size="small"
              type="primary"
              className="h-8"
              htmlType="submit"
            >
              <Typography.Text>Хайх</Typography.Text>
            </Button>
          </Form>
        </Col>
      </Row>
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
      />
    </Card>
  );
};

export default CustomerList;
