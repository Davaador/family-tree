import {
  CalendarOutlined,
  ClearOutlined,
  EyeOutlined,
  FilterOutlined,
  PhoneOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { CustomFormItem } from 'pages/components';
import {
  CustomerListData,
  CustomerListProps,
} from 'pages/private/private.model';
import { getActiveCustomerList } from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';

import CustomerDetailModal from './CustomerDetailModal';
import './CustomerList.css';

const CustomerList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { customers } = useLoaderData() as CustomerListProps;
  const [totalSize, setTotalSize] = useState<CustomerListData>(customers);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [advancedForm] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetail | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentSortField, setCurrentSortField] = useState('birthDate');
  const [currentSortOrder, setCurrentSortOrder] = useState<
    'ascend' | 'descend'
  >('ascend');

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
    return gender === '0'
      ? t('customerList.table.gender.male')
      : t('customerList.table.gender.female');
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
      title: (
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => onSortChange('lastName')}
          onKeyDown={e => e.key === 'Enter' && onSortChange('lastName')}
          role='button'
          tabIndex={0}
        >
          <UserOutlined style={{ color: '#65eaae' }} />
          <span>{t('customerList.table.columns.name')}</span>
          {currentSortField === 'lastName' &&
            (currentSortOrder === 'ascend' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            ))}
        </div>
      ),
      dataIndex: 'lastName',
      key: 'lastName',
      width: '15%',
      render: (text: string, record: CustomerDetail) => (
        <div className='flex items-center gap-2'>
          <Avatar
            size={32}
            style={{ backgroundColor: '#65eaae' }}
            icon={<UserOutlined />}
          />
          <div>
            <div className='font-medium'>{text}</div>
            <div className='text-xs text-gray-500'>{record.firstName}</div>
          </div>
        </div>
      ),
    },
    {
      title: t('customerList.table.columns.phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      render: (text: string, record: CustomerDetail) => (
        <div className='flex items-center gap-2'>
          <PhoneOutlined style={{ color: '#65eaae' }} />
          <span>{record.isDeceased ? '***' : text}</span>
        </div>
      ),
    },
    {
      title: t('customerList.filters.register'),
      dataIndex: 'register',
      key: 'register',
      width: '20%',
      render: (text: string, record: CustomerDetail) => (
        <Tag color='#65eaae' style={{ border: 'none' }}>
          {record.isDeceased ? '***' : text}
        </Tag>
      ),
    },
    {
      title: t('customerList.table.columns.gender'),
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
      title: (
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => onSortChange('age')}
          onKeyDown={e => e.key === 'Enter' && onSortChange('age')}
          role='button'
          tabIndex={0}
        >
          <span>{t('customerList.table.columns.age')}</span>
          {currentSortField === 'age' &&
            (currentSortOrder === 'ascend' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            ))}
        </div>
      ),
      dataIndex: 'age',
      key: 'age',
      width: '8%',
      render: (age: number, record: CustomerDetail) => (
        <Tag color='blue' style={{ border: 'none' }}>
          {record.isDeceased ? '***' : age || '-'}
        </Tag>
      ),
    },
    {
      title: (
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => onSortChange('birthDate')}
          onKeyDown={e => e.key === 'Enter' && onSortChange('birthDate')}
          role='button'
          tabIndex={0}
        >
          <CalendarOutlined style={{ color: '#65eaae' }} />
          <span>{t('customerList.table.columns.birthDate')}</span>
          {currentSortField === 'birthDate' &&
            (currentSortOrder === 'ascend' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            ))}
        </div>
      ),
      dataIndex: 'birthDate',
      key: 'birthDate',
      width: '15%',
      render: date => (
        <div className='flex items-center gap-2'>
          <span>{date ? dayjs(date).format('YYYY-MM-DD') : '-'}</span>
        </div>
      ),
    },
    {
      title: t('customerList.table.columns.actions'),
      key: 'action',
      width: '10%',
      render: (_: any, record: CustomerDetail) => (
        <Space size='small'>
          <Tooltip title={t('customerList.table.actions.view')}>
            <Button
              type='text'
              icon={<EyeOutlined />}
              size='small'
              style={{ color: '#65eaae' }}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, _filters: any, _sorter: any) => {
    const basicValues = form.getFieldsValue();
    const advancedValues = advancedForm.getFieldsValue();
    const filters = {
      ...advancedValues,
      sortField: currentSortField,
    };
    fetchData(
      pagination.pageSize,
      pagination.current - 1,
      currentSortOrder === 'ascend' ? 1 : 0,
      basicValues.label,
      basicValues.value,
      filters
    );
  };

  const fetchData = (
    size: number,
    page: number,
    isSortAscending: number,
    searchLabel?: string,
    searchValue?: string,
    filters?: {
      email?: string;
      register?: string;
      gender?: string;
      minAge?: number;
      maxAge?: number;
      birthDateFrom?: string;
      birthDateTo?: string;
      isDeceased?: boolean;
      isParent?: number;
      sortField?: string;
    }
  ) => {
    setLoading(true);
    getActiveCustomerList(
      size,
      page,
      isSortAscending,
      searchLabel,
      searchValue,
      filters
    )
      .then((res: CustomerListData) => {
        setTotalSize(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSearch = (values: { label: string; value: string }) => {
    // Don't search if value is empty
    if (!values.value || values.value.trim() === '') {
      return;
    }

    const advancedValues = advancedForm.getFieldsValue();
    const filters = {
      ...advancedValues,
      sortField: currentSortField,
    };
    fetchData(
      10,
      0,
      currentSortOrder === 'ascend' ? 1 : 0,
      values.label,
      values.value,
      filters
    );
  };

  const onAdvancedSearch = (values: any) => {
    const basicValues = form.getFieldsValue();

    // Check if any search criteria is provided
    const hasSearchCriteria =
      (basicValues.value && basicValues.value.trim() !== '') ||
      (values.email && values.email.trim() !== '') ||
      (values.register && values.register.trim() !== '') ||
      (values.gender !== undefined &&
        values.gender !== null &&
        values.gender !== '') ||
      (values.minAge !== undefined && values.minAge !== null) ||
      (values.maxAge !== undefined && values.maxAge !== null) ||
      values.birthDateFrom ||
      values.birthDateTo ||
      (values.isDeceased !== undefined && values.isDeceased !== null) ||
      (values.isParent !== undefined &&
        values.isParent !== null &&
        values.isParent !== '');

    // Don't search if no criteria is provided
    if (!hasSearchCriteria) {
      return;
    }

    const filters = {
      ...values,
      sortField: currentSortField,
    };
    fetchData(
      10,
      0,
      currentSortOrder === 'ascend' ? 1 : 0,
      basicValues.label,
      basicValues.value,
      filters
    );
  };

  const onClearFilters = () => {
    form.resetFields();
    advancedForm.resetFields();
    setCurrentSortField('birthDate');
    setCurrentSortOrder('ascend');
    fetchData(10, 0, 1);
  };

  const onSortChange = (field: string) => {
    const newOrder =
      currentSortField === field && currentSortOrder === 'ascend'
        ? 'descend'
        : 'ascend';
    setCurrentSortField(field);
    setCurrentSortOrder(newOrder);

    const basicValues = form.getFieldsValue();
    const advancedValues = advancedForm.getFieldsValue();
    const filters = {
      ...advancedValues,
      sortField: field,
    };
    fetchData(
      10,
      0,
      newOrder === 'ascend' ? 1 : 0,
      basicValues.label,
      basicValues.value,
      filters
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            {t('customerList.title')}
          </h1>
          <p className='text-gray-600'>{t('customerList.subtitle')}</p>
        </div>

        {/* Main Content */}
        <Card className='shadow-xl border-0 rounded-2xl'>
          {/* Search Section */}
          <Row gutter={[12, 12]} className='mb-6'>
            {/* Search Form */}
            <Col xs={24} lg={16}>
              <Form
                form={form}
                layout='vertical'
                onFinish={onSearch}
                initialValues={{ label: 'phoneNumber' }}
              >
                <Row gutter={[8, 8]} align='bottom'>
                  <Col xs={24} sm={8} md={6}>
                    <CustomFormItem
                      name={'label'}
                      label={t('customerList.search.field')}
                    >
                      <Select
                        getPopupContainer={trigger => trigger.parentElement}
                        options={[
                          {
                            value: 'phoneNumber',
                            label: t('customerList.filters.phoneNumber'),
                          },
                          {
                            value: 'lastName',
                            label: t('customerList.filters.lastName'),
                          },
                          {
                            value: 'firstName',
                            label: t('customerList.filters.firstName'),
                          },
                          {
                            value: 'email',
                            label: t('customerList.filters.email'),
                          },
                          {
                            value: 'register',
                            label: t('customerList.filters.register'),
                          },
                        ]}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={10}>
                    <CustomFormItem
                      name={'value'}
                      label={t('customerList.search.value')}
                    >
                      <Input
                        placeholder={t('customerList.search.valuePlaceholder')}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={4} md={4}>
                    <Button
                      size='middle'
                      type='primary'
                      htmlType='submit'
                      icon={<SearchOutlined />}
                      style={{
                        backgroundColor: '#65eaae',
                        borderColor: '#65eaae',
                      }}
                      block
                    >
                      <span className='hidden sm:inline'>
                        {t('customerList.search.searchButton')}
                      </span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>

            {/* Action Buttons */}
            <Col xs={24} lg={8}>
              <div className='flex flex-col sm:flex-row gap-2 sm:justify-end'>
                <Button
                  icon={<FilterOutlined />}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  type={showAdvancedFilters ? 'primary' : 'default'}
                  block
                  className='sm:w-auto'
                >
                  <span className='hidden sm:inline'>
                    {t('customerList.search.advancedFilters')}
                  </span>
                  <span className='sm:hidden'>
                    {t('customerList.search.advancedFiltersShort')}
                  </span>
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  onClick={onClearFilters}
                  type='default'
                  block
                  className='sm:w-auto'
                >
                  <span className='hidden sm:inline'>
                    {t('customerList.search.clearFilters')}
                  </span>
                  <span className='sm:hidden'>
                    {t('customerList.search.clearFilters')}
                  </span>
                </Button>
              </div>
            </Col>
          </Row>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <Card className='mb-6' style={{ backgroundColor: '#f8f9fa' }}>
              <Form
                form={advancedForm}
                layout='vertical'
                onFinish={onAdvancedSearch}
                initialValues={{
                  gender: undefined,
                  isDeceased: undefined,
                  isParent: undefined,
                }}
              >
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='email'
                      label={t('customerList.filters.email')}
                    >
                      <Input placeholder={t('customerList.filters.email')} />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='register'
                      label={t('customerList.filters.register')}
                    >
                      <Input placeholder={t('customerList.filters.register')} />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='gender'
                      label={t('customerList.filters.gender')}
                    >
                      <Select
                        getPopupContainer={trigger =>
                          trigger.parentElement || document.body
                        }
                        placeholder={t(
                          'customerList.filters.genderPlaceholder'
                        )}
                        options={[
                          {
                            value: '',
                            label: t('customerList.filters.genderOptions.all'),
                          },
                          {
                            value: '0',
                            label: t('customerList.filters.genderOptions.male'),
                          },
                          {
                            value: '1',
                            label: t(
                              'customerList.filters.genderOptions.female'
                            ),
                          },
                        ]}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='isParent'
                      label={t('customerList.filters.childType')}
                    >
                      <Select
                        getPopupContainer={trigger =>
                          trigger.parentElement || document.body
                        }
                        placeholder={t(
                          'customerList.filters.childTypePlaceholder'
                        )}
                        options={[
                          {
                            value: '',
                            label: t(
                              'customerList.filters.childTypeOptions.all'
                            ),
                          },
                          {
                            value: 0,
                            label: t(
                              'customerList.filters.childTypeOptions.born'
                            ),
                          },
                          {
                            value: 1,
                            label: t(
                              'customerList.filters.childTypeOptions.sonInLaw'
                            ),
                          },
                          {
                            value: 2,
                            label: t(
                              'customerList.filters.childTypeOptions.daughterInLaw'
                            ),
                          },
                        ]}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='minAge'
                      label={t('customerList.filters.minAge')}
                    >
                      <InputNumber
                        placeholder={t('customerList.filters.agePlaceholder')}
                        min={0}
                        max={150}
                        style={{ width: '100%' }}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='maxAge'
                      label={t('customerList.filters.maxAge')}
                    >
                      <InputNumber
                        placeholder={t('customerList.filters.agePlaceholder')}
                        min={0}
                        max={150}
                        style={{ width: '100%' }}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='birthDateFrom'
                      label={t('customerList.filters.birthDateFrom')}
                    >
                      <DatePicker
                        getPopupContainer={trigger =>
                          trigger.parentElement || document.body
                        }
                        style={{ width: '100%' }}
                        placeholder={t(
                          'customerList.filters.birthDateFromPlaceholder'
                        )}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='birthDateTo'
                      label={t('customerList.filters.birthDateTo')}
                    >
                      <DatePicker
                        getPopupContainer={trigger =>
                          trigger.parentElement || document.body
                        }
                        style={{ width: '100%' }}
                        placeholder={t(
                          'customerList.filters.birthDateToPlaceholder'
                        )}
                      />
                    </CustomFormItem>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <CustomFormItem
                      name='isDeceased'
                      label={t('customerList.filters.isDeceased')}
                      valuePropName='checked'
                    >
                      <Select
                        getPopupContainer={trigger =>
                          trigger.parentElement || document.body
                        }
                        placeholder={t(
                          'customerList.filters.isDeceasedPlaceholder'
                        )}
                        options={[
                          {
                            value: '',
                            label: t(
                              'customerList.filters.isDeceasedOptions.all'
                            ),
                          },
                          {
                            value: true,
                            label: t(
                              'customerList.filters.isDeceasedOptions.yes'
                            ),
                          },
                          {
                            value: false,
                            label: t(
                              'customerList.filters.isDeceasedOptions.no'
                            ),
                          },
                        ]}
                      />
                    </CustomFormItem>
                  </Col>
                </Row>
                <Divider />
                <Row justify='center'>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <div className='flex flex-col sm:flex-row gap-2'>
                      <Button
                        onClick={() => setShowAdvancedFilters(false)}
                        block
                        className='sm:w-auto'
                      >
                        {t('customerList.search.close')}
                      </Button>
                      <Button
                        type='primary'
                        htmlType='submit'
                        icon={<SearchOutlined />}
                        style={{
                          backgroundColor: '#65eaae',
                          borderColor: '#65eaae',
                        }}
                        block
                        className='sm:w-auto'
                      >
                        <span className='hidden sm:inline'>
                          {t('customerList.search.advancedSearch')}
                        </span>
                        <span className='sm:hidden'>
                          {t('customerList.search.advancedSearchShort')}
                        </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}

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
            className='customer-table'
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
