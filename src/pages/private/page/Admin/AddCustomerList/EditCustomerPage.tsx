import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, message, Typography } from 'antd';
import {
  getAdminCustomerById,
  updateAdmin,
} from 'context/services/admin.service';
import { parentService } from 'context/services/parent.service';
import { getAvailableSpousesForCustomer } from 'context/services/customer.service';
import dayjs from 'dayjs';
import { useApi } from 'hooks';
import { CardHeader } from 'pages/components';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerModel } from 'types/customer.types';

import {
  ProfileSection,
  ContactSection,
  FamilyMemberSection,
} from './components';

const { Text } = Typography;

const EditCustomerPage = React.memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [isDeceased, setIsDeceased] = useState<boolean>(false);
  const [parents, setParents] = useState<CustomerModel.Customer[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<
    string | undefined
  >();
  const [availableSpouses, setAvailableSpouses] = useState<
    CustomerModel.Customer[]
  >([]);
  const [selectedSpouseId, setSelectedSpouseId] = useState<
    string | undefined
  >();
  const [customer, setCustomer] = useState<CustomerModel.AdminCustomer | null>(
    null
  );

  const { loading: fetchLoading, execute: fetchCustomer } =
    useApi<CustomerModel.AdminCustomer>({
      onSuccess: data => {
        setCustomer(data);
        initializeForm(data);
      },
      onError: () => {
        message.error('Хэрэглэгч олдсонгүй');
        navigate('/add/customer/list');
      },
    });

  const { loading: updateLoading, execute: handleUpdate } =
    useApi<CustomerModel.AdminCustomer>({
      onSuccess: () => {
        message.success(t('admin.edit.success'));
        navigate('/add/customer/list');
      },
    });

  const { loading: parentsLoading, execute: fetchParents } = useApi<
    CustomerModel.Customer[]
  >({
    onSuccess: data => {
      if (Array.isArray(data)) {
        setParents(data);
      } else {
        setParents([]);
      }
    },
  });

  const { loading: spousesLoading, execute: fetchSpouses } = useApi<
    CustomerModel.Customer[]
  >({
    onSuccess: data => {
      if (Array.isArray(data)) {
        setAvailableSpouses(data);
      } else {
        setAvailableSpouses([]);
      }
    },
  });

  const initializeForm = useCallback(
    (customerData: CustomerModel.AdminCustomer) => {
      setIsDeceased(customerData.isDeceased || false);
      setSelectedParentId(customerData.lastNameId?.toString());
      setSelectedSpouseId(customerData.spouseId?.toString());
      form.setFieldsValue({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        surName: customerData.surName,
        phoneNumber: customerData.phoneNumber,
        email: customerData.email,
        register: customerData.register,
        isParent: customerData.isParent,
        lastNameId: customerData.lastNameId,
        spouseId: customerData.spouseId,
        gender: customerData.gender,
        birthDate: customerData.birthDate
          ? dayjs(customerData.birthDate).format('YYYY-MM-DD')
          : undefined,
        deceasedDate: customerData.deceasedDate
          ? dayjs(customerData.deceasedDate).format('YYYY-MM-DD')
          : undefined,
      });
    },
    [form]
  );

  const handleParentIdChange = useCallback(
    (value: string) => {
      setSelectedParentId(value);
      form.setFieldValue('lastNameId', value);
      if (!value) form.setFieldValue('isParent', undefined);
    },
    [form]
  );

  const handleSpouseIdChange = useCallback(
    (value: string) => {
      setSelectedSpouseId(value);
      form.setFieldValue('spouseId', value);
    },
    [form]
  );

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (!customer) return;
      const updatedCustomer = {
        ...customer,
        ...values,
        birthDate: values.birthDate || customer.birthDate,
        age: values.birthDate
          ? dayjs(values.birthDate).diff(dayjs(), 'year') * -1
          : customer.age,
        isDeceased,
        deceasedDate:
          isDeceased && values.deceasedDate ? values.deceasedDate : undefined,
        lastNameId: selectedParentId ? Number(selectedParentId) : undefined,
        spouseId: selectedSpouseId ? Number(selectedSpouseId) : undefined,
        gender: customer.gender, // Keep existing gender
      };
      await handleUpdate(() => updateAdmin(customer.id, updatedCustomer));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Form validation failed:', error);
      }
    }
  }, [
    form,
    customer,
    isDeceased,
    selectedParentId,
    selectedSpouseId,
    handleUpdate,
  ]);

  useEffect(() => {
    if (id) {
      fetchCustomer(() => getAdminCustomerById(Number(id)));
      fetchParents(() => parentService.getParents());
    }
  }, [id, fetchCustomer, fetchParents]);

  // Fetch spouses after customer data is loaded
  useEffect(() => {
    if (customer?.id) {
      fetchSpouses(() => getAvailableSpousesForCustomer(customer.id));
    }
  }, [customer?.id, fetchSpouses]);

  if (fetchLoading || !customer) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <Text>Уншиж байна...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className='layout-transparent'>
      <CardHeader
        headerTitle={t('admin.edit.title')}
        onBack={true}
        onPress={() => navigate('/add/customer/list')}
      />
      <div className='py-4'>
        <Form form={form} layout='vertical' className='space-y-6'>
          <ProfileSection
            form={form}
            parents={parents}
            parentsLoading={parentsLoading}
            selectedParentId={selectedParentId}
            isDeceased={isDeceased}
            setIsDeceased={setIsDeceased}
            handleParentIdChange={handleParentIdChange}
            t={t}
          />
          <FamilyMemberSection
            availableSpouses={availableSpouses}
            spousesLoading={spousesLoading}
            selectedSpouseId={selectedSpouseId}
            handleSpouseIdChange={handleSpouseIdChange}
            customerGender={customer?.gender}
          />
          <ContactSection form={form} customer={customer} t={t} />
          <div className='flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200'>
            <Button
              size='large'
              icon={<CloseOutlined />}
              onClick={() => navigate('/add/customer/list')}
              className='px-6 py-2 h-auto rounded-lg border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800'
            >
              {t('admin.edit.cancel')}
            </Button>
            <Button
              type='primary'
              size='large'
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={updateLoading}
              className='px-6 py-2 h-auto rounded-lg bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-500'
            >
              {t('admin.edit.save')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
});

EditCustomerPage.displayName = 'EditCustomerPage';
export default EditCustomerPage;
