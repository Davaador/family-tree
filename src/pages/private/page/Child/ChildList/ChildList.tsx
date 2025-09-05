import { Layout, Table, TableProps } from 'antd';
import { CustomerModel } from 'context/entities/customer.model';
import dayjs from 'dayjs';
import { CardHeader } from 'pages/components';
import { ChildListProps } from 'pages/private/private.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

const ChildList = () => {
  const navigate = useNavigate();
  const { child } = useLoaderData() as ChildListProps;
  const [data, setData] = useState<CustomerModel.ParentDto[]>(child.datas);
  const { t } = useTranslation();
  useEffect(() => {
    setData(child.datas);
  }, [child]);

  const columns: TableProps<CustomerModel.ParentDto>['columns'] = [
    {
      title: '№',
      width: '5%',
      key: 'id',
      render: (_: string, _record: any, index: number) => index + 1,
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '25%',
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '30%',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '15%',
      render: value => (value === '0' ? 'Эрэгтэй' : 'Эмэгтэй'),
    },
    {
      title: t('register.birthday'),
      dataIndex: 'birthDate',
      key: 'birthDate',
      width: '25%',
      render: date => (date ? dayjs(date).format('YYYY-MM-DD') : ''),
      sorter: (a, b) => {
        const dateA = a.birthDate ? dayjs(a.birthDate).valueOf() : 0;
        const dateB = b.birthDate ? dayjs(b.birthDate).valueOf() : 0;
        return dateB - dateA;
      },
    },
  ];

  return (
    <Layout className='layout-transparent'>
      <CardHeader
        headerTitle='Өөрийн хүүхдүүд'
        onAddClick={() => {
          navigate('/add/child');
        }}
      />
      <Table
        dataSource={Array.isArray(data) ? data : []}
        bordered
        scroll={{ x: '100%' }}
        columns={columns}
        rowKey={key => key.id}
      />
    </Layout>
  );
};

export default ChildList;
