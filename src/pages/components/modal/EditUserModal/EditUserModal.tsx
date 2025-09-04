import { LogoutOutlined } from '@ant-design/icons';
import { Flex, Form, Input, Modal, notification, Radio, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';
import { CustomerModel } from 'context/entities/customer.model';
import { parentService } from 'context/services/parent.service';
import validations from 'context/validations';
import dayjs from 'dayjs';
import 'dayjs/locale/mn';
import {
  CustomFormItem,
  CustomInput,
  SubmitButton,
} from 'pages/components/atomics';
import { renderLastName } from 'pages/private/hooks/useCustomerHook';
import { getUserDetail } from 'pages/private/private.service';
import { AddParentForm, CustomerDetail } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface EditUserModalProps {
  isShow: boolean;
  handleOk?: () => void;
  toggleModal: Function;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { isShow, toggleModal } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [parents, setParents] = useState<CustomerModel.Customer[]>();
  const [selectedParentId, setSelectedParentId] = useState<
    string | undefined
  >();
  const { authUser, roleUser, setAuthUser } = authStore();
  const navigate = useNavigate();

  // Check if user is admin (ROOT or ADMIN role)
  const isAdmin = roleUser?.some(
    (role) =>
      role.name === RolesConstants.ROOT || role.name === RolesConstants.ADMIN
  );

  const onFinish = (values: AddParentForm) => {
    // setLoading(true);

    // Ensure isParent is set when parentId is selected

    const body: AddParentForm = {
      ...values,
      parentId: selectedParentId ? Number(selectedParentId) : 0,
    };

    parentService
      .addParent(body)
      .then((res: CustomerModel.Customer) => {
        getUserDetail()
          .then((details: CustomerDetail) => {
            if (res.id === details.id) {
              setAuthUser(details);
              form.resetFields();
              notification.success({
                message: 'Амжилттай',
                description: 'Та ургийн мэдээлэл амжилттай нэмэгдлээ.',
              });
              toggleModal();
            }
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onChangeDate = (date: dayjs.Dayjs, dateString: string | string[]) => {
    if (date) {
      form.setFieldValue('age', dayjs().diff(date, 'year'));
    } else {
      form.setFieldValue('age', null);
    }
  };

  const handleParentIdChange = (value: string) => {
    setSelectedParentId(value);
    // Clear the isParent field when parentId changes
    if (!value) {
      form.setFieldValue('isParent', undefined);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (isShow) {
      parentService.getParents().then((res) => {
        setParents(res);
        setLoading(false);
      });

      // Set form values when modal opens
      if (authUser) {
        // Set selectedParentId if parent exists
        if (authUser.parent?.id) {
          setSelectedParentId(authUser.parent.id.toString());
        }

        form.setFieldsValue({
          register: authUser.register,
          surName: authUser.surName,
          email: authUser.email,
          parentId: authUser.parent?.id || undefined,
          isParent: authUser.parent?.isParent, // Default to "Төрсөн хүүхэд" (Born child)
          birthDate: authUser.birthDate
            ? (() => {
                try {
                  return dayjs(authUser.birthDate).format('YYYY-MM-DD');
                } catch (error) {
                  return undefined;
                }
              })()
            : undefined,
          age: authUser.age,
        });
      }
    } else {
      // Reset selectedParentId when modal is closed
      setSelectedParentId(undefined);
    }
  }, [isShow, authUser, form]);

  // Additional useEffect to handle authUser changes
  useEffect(() => {
    if (isShow && authUser) {
      // Set selectedParentId if parent exists
      if (authUser.parent?.id) {
        setSelectedParentId(authUser.parent.id.toString());
      }

      form.setFieldsValue({
        register: authUser.register,
        surName: authUser.surName,
        email: authUser.email,
        parentId: authUser.parent?.id || undefined,
        isParent: authUser.parent?.isParent, // Default to "Төрсөн хүүхэд" (Born child)
        birthDate: authUser.birthDate
          ? (() => {
              try {
                return dayjs(authUser.birthDate).format('YYYY-MM-DD');
              } catch (error) {
                return undefined;
              }
            })()
          : undefined,
        age: authUser.age,
      });
    }
  }, [authUser, isShow, form]);

  return (
    <Modal
      loading={loading}
      title="test"
      open={isShow}
      footer
      maskClosable={isAdmin}
      onCancel={() => (isAdmin ? toggleModal() : navigate('/logout'))}
      closeIcon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />}
    >
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          register: authUser?.register,
          surName: authUser?.surName,
          email: authUser?.email,
          parentId: authUser?.parent?.id || undefined,
          isParent: authUser?.parent?.isParent, // Default to "Төрсөн хүүхэд" (Born child)
          birthDate: authUser?.birthDate
            ? (() => {
                try {
                  return dayjs(authUser.birthDate).format('YYYY-MM-DD');
                } catch (error) {
                  return undefined;
                }
              })()
            : undefined,
          age: authUser?.age,
        }}
      >
        <CustomFormItem
          name="parentId"
          label={`Өөрийн овог${!isAdmin ? ' *' : ''}`}
          rules={[
            {
              required: !isAdmin,
              message: !isAdmin ? 'Өөрийн овгийг сонгоно уу' : undefined,
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder={
              isAdmin
                ? 'Өөрийн овгийг сонгоно уу (сонгох боломжтой)'
                : 'Өөрийн овгийг сонгоно уу'
            }
            size="large"
            className="letter-select"
            onChange={handleParentIdChange}
            filterOption={(input, option) => {
              if (!option?.children) return false;
              const displayName = option.children.toString().toLowerCase();
              return displayName.includes(input.toLowerCase());
            }}
            getPopupContainer={(triggerNode) =>
              triggerNode.parentNode || document.body
            }
          >
            <Select.Option value="">
              {isAdmin ? 'Сонгохгүй' : t('register.allLetters')}
            </Select.Option>
            {parents
              ? parents.map((letter) => (
                  <Select.Option key={letter.id} value={letter.id}>
                    {renderLastName(letter.lastName, letter.firstName)}
                  </Select.Option>
                ))
              : []}
          </Select>
        </CustomFormItem>
        <div
          style={{
            opacity: selectedParentId ? 1 : 0,
            maxHeight: selectedParentId ? '200px' : '0px',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            marginBottom: selectedParentId ? '16px' : '0px',
          }}
        >
          <CustomFormItem
            name="isParent"
            label="Хүүхдийн төрөл"
            rules={[
              {
                required:
                  selectedParentId !== undefined && selectedParentId !== '',
                message: 'Хүүхдийн төрлийг сонгоно уу',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={0}>Төрсөн хүүхэд</Radio>
              <Radio value={1}>Хүргэн</Radio>
              <Radio value={2}>Бэр</Radio>
            </Radio.Group>
          </CustomFormItem>
        </div>
        <div
          style={{
            opacity: !selectedParentId && !isAdmin ? 1 : 0,
            maxHeight: !selectedParentId && !isAdmin ? '50px' : '0px',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            marginBottom: !selectedParentId && !isAdmin ? '16px' : '0px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
            * Өөрийн овгийг сонгосны дараа хүүхдийн төрөл сонгох боломжтой
          </div>
        </div>
        <CustomFormItem
          name="surName"
          label="Ургийн овог"
          rules={[{ required: true }]}
        >
          <CustomInput placeholder="Ургийн овог" />
        </CustomFormItem>
        <CustomFormItem
          name="email"
          label="И-Мэйл"
          rules={[
            { required: true, message: 'email oruulna uu' },
            () => ({
              validator(rule, value) {
                if (validations.regex.email.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('email hayg zuv oruulna uu.');
                }
              },
            }),
          ]}
        >
          <CustomInput placeholder="И-Мэйл" />
        </CustomFormItem>
        <CustomFormItem
          label={t('profile.birthDate')}
          required
          rules={[{ required: true, message: 'төрсөн өдрөө сонгон уу.' }]}
          name="birthDate"
        >
          <Input
            type="date"
            style={{ width: '100%' }}
            placeholder="Төрсөн өдөр сонгоно уу"
            size="large"
            onChange={(e) => {
              const date = dayjs(e.target.value);
              onChangeDate(date, e.target.value);
            }}
          />
        </CustomFormItem>
        <CustomFormItem label="Нас" required name="age">
          <Input placeholder="Нас" disabled />
        </CustomFormItem>
        <Flex justify="center">
          <SubmitButton
            style={{ alignItems: 'center', justifyContent: 'center' }}
            loading={loading}
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
