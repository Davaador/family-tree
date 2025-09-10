import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Form,
  Input,
  Button,
  notification,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  EditOutlined,
  SaveOutlined,
  HistoryOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { CustomerModel } from 'types/customer.types';
import {
  addBiographyForCustomer,
  getBiographyForCustomer,
  getBiographyHistoryForCustomer,
  restoreBiographyVersionForCustomer,
} from 'context/services/admin.service';
import { useApi } from 'hooks';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface BiographyEditModalProps {
  visible: boolean;
  onClose: () => void;
  customer: CustomerModel.AdminCustomer | null;
  onSuccess?: () => void;
}

const BiographyEditModal: React.FC<BiographyEditModalProps> = ({
  visible,
  onClose,
  customer,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [biographyData, setBiographyData] =
    useState<CustomerModel.BiographyCustomer | null>(null);
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);
  const [biographyHistory, setBiographyHistory] = useState<
    CustomerModel.BiographyHistory[]
  >([]);

  const { execute: fetchBiography } = useApi<CustomerModel.BiographyCustomer>({
    onSuccess: data => {
      setBiographyData(data);
      if (data?.detailBiography) {
        form.setFieldsValue({ detailBiography: data.detailBiography });
        setCharacterCount(data.detailBiography.length);
        setLastSaved(
          data.updatedAt
            ? new Date(data.updatedAt).toLocaleString('mn-MN')
            : data.createdAt
              ? new Date(data.createdAt).toLocaleString('mn-MN')
              : ''
        );
      }
    },
    onError: () => {
      // If no biography exists, that's okay - we'll create a new one
      setBiographyData(null);
      form.resetFields();
      setCharacterCount(0);
      setLastSaved('');
    },
  });

  const { loading: saveLoading, execute: saveBiography } =
    useApi<CustomerModel.BiographyCustomer>({
      onSuccess: data => {
        setBiographyData(data);
        setLastSaved(new Date().toLocaleString('mn-MN'));
        notification.success({
          message: t('biography.success.title'),
          description: t('biography.success.message'),
        });
        onSuccess?.();
        onClose(); // Модалыг хаах
      },
      onError: () => {
        notification.error({
          message: t('biography.error.title'),
          description: t('biography.error.save'),
        });
      },
    });

  useEffect(() => {
    if (visible && customer) {
      fetchBiography(() => getBiographyForCustomer(customer.id));
    }
  }, [visible, customer, fetchBiography]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setCharacterCount(0);
    setLastSaved('');
    setBiographyData(null);
    onClose();
  }, [form, onClose]);

  const handleSubmit = useCallback(
    (values: CustomerModel.BiographyCustomer) => {
      if (!customer) return;

      saveBiography(() => addBiographyForCustomer(customer.id, values));
    },
    [customer, saveBiography]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(e.target.value.length);
    },
    []
  );

  const handleShowHistory = useCallback(async () => {
    if (!customer) return;

    if (!historyVisible) {
      try {
        const history = await getBiographyHistoryForCustomer(customer.id);
        setBiographyHistory(Array.isArray(history) ? history : []);
      } catch (error) {
        notification.error({
          message: t('biography.error.title'),
          description: t('biography.error.history'),
        });
      }
    }
    setHistoryVisible(!historyVisible);
  }, [customer, historyVisible, t]);

  const handleRestoreVersion = useCallback(
    async (historyId: number) => {
      if (!customer) return;

      try {
        const restoredBiography = await restoreBiographyVersionForCustomer(
          customer.id,
          historyId
        );
        form.setFieldsValue({
          detailBiography: restoredBiography.detailBiography,
        });
        setCharacterCount(restoredBiography.detailBiography.length);
        setLastSaved(new Date().toLocaleString('mn-MN'));
        setBiographyData(restoredBiography);
        notification.success({
          message: t('biography.success.title'),
          description: t('biography.success.restore'),
        });
      } catch (error) {
        notification.error({
          message: t('biography.error.title'),
          description: t('biography.error.save'),
        });
      }
    },
    [customer, form, t]
  );

  if (!customer) return null;

  return (
    <Modal
      title={
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
            <FileTextOutlined className='text-blue-600 text-lg' />
          </div>
          <div>
            <Title level={4} className='!mb-0'>
              {t('admin.biography.editTitle')}
            </Title>
            <Text type='secondary' className='text-sm'>
              {customer.firstName} {customer.lastName}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={window.innerWidth < 768 ? '95%' : 800}
      centered
      zIndex={10001}
      className='biography-edit-modal mobile-modal'
    >
      <div className='py-4'>
        {/* Statistics Card */}
        <Card
          className='mb-6 rounded-xl shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50'
          styles={{ body: { padding: '20px' } }}
        >
          <Row gutter={[8, 16]}>
            <Col xs={24} sm={8}>
              <div className='text-center'>
                <Statistic
                  title={t('biography.characterCount')}
                  value={characterCount}
                  suffix='/10000'
                  valueStyle={{
                    color: characterCount > 5000 ? '#ff4d4f' : '#1890ff',
                    fontSize: window.innerWidth < 768 ? '16px' : '20px',
                  }}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className='text-center'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <ClockCircleOutlined className='text-green-500' />
                  <Text type='secondary' className='text-xs sm:text-sm'>
                    {t('biography.lastSaved')}
                  </Text>
                </div>
                <Text className='text-xs sm:text-sm font-medium'>
                  {lastSaved || t('biography.notSaved')}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className='text-center'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <HistoryOutlined className='text-purple-500' />
                  <Text type='secondary' className='text-xs sm:text-sm'>
                    {t('biography.status')}
                  </Text>
                </div>
                <Text className='text-xs sm:text-sm font-medium'>
                  {biographyData ? t('biography.exists') : t('biography.new')}
                </Text>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Biography Form */}
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          className='biography-form'
        >
          <Form.Item
            name='detailBiography'
            label={
              <span className='flex items-center gap-2 font-medium text-gray-700'>
                <EditOutlined className='text-blue-500' />
                {t('biography.content')}
              </span>
            }
            rules={[
              {
                max: 10000,
                message: t('biography.validation.maxLength'),
              },
            ]}
          >
            <TextArea
              rows={12}
              placeholder={t('biography.placeholder')}
              onChange={handleTextChange}
              className='resize-none'
              showCount
              maxLength={10000}
            />
          </Form.Item>

          <div className='pt-4 border-t border-gray-100'>
            {/* Mobile: Stack buttons vertically */}
            <div className='flex flex-col gap-3 md:hidden'>
              <Button
                icon={<HistoryOutlined />}
                onClick={handleShowHistory}
                type={historyVisible ? 'primary' : 'default'}
                size='large'
                block
              >
                {t('biography.history')}
              </Button>
              <div className='flex gap-2'>
                <Button onClick={handleCancel} size='large' className='flex-1'>
                  {t('common.cancel')}
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  icon={<SaveOutlined />}
                  loading={saveLoading}
                  size='large'
                  className='flex-1 bg-blue-600 hover:bg-blue-700'
                >
                  {t('biography.save')}
                </Button>
              </div>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className='hidden md:flex justify-between items-center'>
              <Button
                icon={<HistoryOutlined />}
                onClick={handleShowHistory}
                type={historyVisible ? 'primary' : 'default'}
                size='large'
              >
                {t('biography.history')}
              </Button>
              <div className='flex gap-3'>
                <Button onClick={handleCancel} size='large'>
                  {t('common.cancel')}
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  icon={<SaveOutlined />}
                  loading={saveLoading}
                  size='large'
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  {t('biography.save')}
                </Button>
              </div>
            </div>
          </div>
        </Form>

        {/* Biography History Panel */}
        {historyVisible && (
          <Card
            title={t('biography.historyTitle')}
            style={{ marginTop: 16 }}
            className='mobile-history-panel'
          >
            {biographyHistory.length > 0 ? (
              <div className='space-y-3'>
                {biographyHistory.map(history => (
                  <Card
                    key={history.id}
                    size='small'
                    className='border border-gray-200'
                    actions={[
                      <Button
                        type='link'
                        icon={<UndoOutlined />}
                        onClick={() => handleRestoreVersion(history.id)}
                        size={window.innerWidth < 768 ? 'small' : 'middle'}
                      >
                        {t('biography.restore')}
                      </Button>,
                    ]}
                  >
                    <div className='text-xs sm:text-sm'>
                      <Text strong className='text-sm'>
                        {t('biography.version', {
                          number: history.versionNumber,
                        })}
                      </Text>
                      <br />
                      <Text type='secondary' className='text-xs'>
                        {new Date(history.createdAt).toLocaleString('mn-MN')}
                      </Text>
                      <br />
                      <Text type='secondary' className='text-xs'>
                        {history.changeDescription}
                      </Text>
                      <br />
                      <div
                        className='mt-2 p-2 bg-gray-50 rounded text-xs sm:text-sm'
                        style={{
                          maxHeight: window.innerWidth < 768 ? '80px' : '100px',
                          overflow: 'auto',
                        }}
                      >
                        {history.biographyContent}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Text type='secondary' className='text-sm'>
                {t('biography.historyEmpty')}
              </Text>
            )}
          </Card>
        )}
      </div>
    </Modal>
  );
};

export default BiographyEditModal;
