import {
  Col,
  Form,
  Layout,
  notification,
  Row,
  Input,
  Card,
  Space,
  Typography,
  Button,
  Tooltip,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomerModel } from 'context/entities/customer.model';
import {
  createBiography,
  getBiographyHistory,
  restoreBiographyVersion,
  getThreeGenerationsBiography,
} from 'context/services/customer.service';
import { CardHeader, CustomFormItem, SubmitButton } from 'pages/components';
import { BiographyProps } from 'pages/private/private.model';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResponsive } from 'hooks';
import {
  EyeOutlined,
  SaveOutlined,
  HistoryOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './EditBiography.less';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

const EditBiography = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [form] = useForm();
  const { biographyData } = useLoaderData() as BiographyProps;
  const [loading, setLoading] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);
  const [biographyHistory, setBiographyHistory] = useState<
    CustomerModel.BiographyHistory[]
  >([]);

  useEffect(() => {
    if (biographyData?.detailBiography) {
      setCharacterCount(biographyData.detailBiography.length);
      setLastSaved(
        biographyData.updatedAt
          ? new Date(biographyData.updatedAt).toLocaleString('mn-MN')
          : ''
      );
    }
  }, [biographyData]);

  const onSubmit = (values: CustomerModel.BiographyCustomer) => {
    setLoading(true);
    createBiography(values)
      .then(res => {
        if (res) {
          setLastSaved(new Date().toLocaleString('mn-MN'));
          notification.success({
            message: t('biography.success.title'),
            description: t('biography.success.message'),
          });
        }
      })
      .catch(() => {
        notification.error({
          message: t('biography.error.title'),
          description: t('biography.error.save'),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleExport = () => {
    const content = form.getFieldValue('detailBiography');
    if (content) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `biography_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleExportThreeGenerations = async () => {
    try {
      const response = await getThreeGenerationsBiography();
      const data = response.data || response;

      let content = '';
      const generations = data.generations || {};

      // Add header
      content += 'ГУРВАН ҮЕИЙН НАМТАР\n';
      content += '='.repeat(50) + '\n\n';

      // Add self biography
      if (data.self && data.self.detailBiography) {
        const selfName = generations.self?.name || 'Өөрийн намтар';
        content += `1. ${selfName}\n`;
        content += '-'.repeat(30) + '\n';
        content += data.self.detailBiography + '\n\n';
      }

      // Add father biography
      if (data.father && data.father.detailBiography) {
        const fatherName = generations.father?.name || 'Аавын намтар';
        content += `2. ${fatherName}\n`;
        content += '-'.repeat(30) + '\n';
        content += data.father.detailBiography + '\n\n';
      }

      // Add grandfather biography
      if (data.grandfather && data.grandfather.detailBiography) {
        const grandfatherName =
          generations.grandfather?.name || 'Өвөөгийн намтар';
        content += `3. ${grandfatherName}\n`;
        content += '-'.repeat(30) + '\n';
        content += data.grandfather.detailBiography + '\n\n';
      }

      // Add summary
      content += '='.repeat(50) + '\n';
      content += `Энэ намтар ${new Date().toLocaleDateString('mn-MN')} өдөр татагдсан.\n`;

      // Download file
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `three_generations_biography_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      notification.success({
        message: t('biography.success.title'),
        description: t('biography.threeGenerations.success'),
      });
    } catch (error) {
      notification.error({
        message: t('biography.error.title'),
        description: t('biography.threeGenerations.error'),
      });
    }
  };

  const handleShowHistory = async () => {
    if (!historyVisible) {
      try {
        const history = await getBiographyHistory();
        // API returns List<BiographyHistoryDto> directly, not wrapped in data
        const historyData = history.data || history || [];
        setBiographyHistory(Array.isArray(historyData) ? historyData : []);
      } catch (error) {
        notification.error({
          message: t('biography.error.title'),
          description: t('biography.error.history'),
        });
      }
    }
    setHistoryVisible(!historyVisible);
  };

  const handleRestoreVersion = async (historyId: number) => {
    try {
      const restoredBiography = await restoreBiographyVersion(historyId);
      // API returns BiographyDto directly, not wrapped in data
      const biographyData = restoredBiography.data || restoredBiography;
      form.setFieldsValue({
        detailBiography: biographyData.detailBiography,
      });
      setCharacterCount(biographyData.detailBiography.length);
      setLastSaved(new Date().toLocaleString('mn-MN'));
      notification.success({
        message: t('biography.success.title'),
        description: t('biography.success.restore'),
      });
    } catch (error) {
      notification.error({
        message: t('biography.error.title'),
        description: t('biography.error.restore'),
      });
    }
  };

  return (
    <Layout
      className={`layout-transparent edit-biography-layout ${isMobile ? 'mobile' : 'desktop'}`}
    >
      <CardHeader headerTitle={t('biography.title')} />

      {/* Statistics and Actions Bar */}
      <Card size='small' className='edit-biography-stats-card'>
        <Row gutter={[16, 16]} align='middle'>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Space direction='vertical' size='small' style={{ width: '100%' }}>
              <Text type='secondary' className='edit-biography-stats-text'>
                <InfoCircleOutlined />{' '}
                {t('biography.characterCount', { count: characterCount })}
              </Text>
              {lastSaved && (
                <Text type='secondary' className='edit-biography-stats-text'>
                  <SaveOutlined />{' '}
                  {t('biography.lastSaved', { date: lastSaved })}
                </Text>
              )}
            </Space>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Space
              wrap
              className={`edit-biography-actions-space ${isMobile ? 'mobile' : 'desktop'}`}
            >
              <Tooltip title={t('biography.tooltips.preview')}>
                <Button
                  icon={<EyeOutlined />}
                  onClick={handlePreview}
                  type={previewMode ? 'primary' : 'default'}
                  size='small'
                >
                  <span
                    className={`edit-biography-button-text ${isMobile ? 'mobile' : 'desktop'}`}
                  >
                    {previewMode ? t('biography.edit') : t('biography.preview')}
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title={t('biography.tooltips.export')}>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  disabled={!form.getFieldValue('detailBiography')}
                  size='small'
                >
                  <span
                    className={`edit-biography-button-text ${isMobile ? 'mobile' : 'desktop'}`}
                  >
                    {t('biography.export')}
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title={t('biography.tooltips.exportThreeGenerations')}>
                <Button
                  icon={<TeamOutlined />}
                  onClick={handleExportThreeGenerations}
                  size='small'
                  type='primary'
                >
                  <span
                    className={`edit-biography-button-text ${isMobile ? 'mobile' : 'desktop'}`}
                  >
                    {t('biography.threeGenerations.export')}
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title={t('biography.tooltips.history')}>
                <Button
                  icon={<HistoryOutlined />}
                  onClick={handleShowHistory}
                  type={historyVisible ? 'primary' : 'default'}
                  size='small'
                >
                  <span
                    className={`edit-biography-button-text ${isMobile ? 'mobile' : 'desktop'}`}
                  >
                    {t('biography.history')}
                  </span>
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        initialValues={{
          detailBiography: biographyData ? biographyData.detailBiography : '',
        }}
      >
        <Row
          className={`edit-biography-form-row ${isMobile ? 'mobile' : 'desktop'}`}
          gutter={[16, 16]}
        >
          <Col span={24}>
            {previewMode ? (
              <Card title={t('biography.previewTitle')} size='small'>
                <Paragraph
                  className={`edit-biography-preview-paragraph ${isMobile ? 'mobile' : 'desktop'}`}
                >
                  {form.getFieldValue('detailBiography') ||
                    t('biography.previewEmpty')}
                </Paragraph>
              </Card>
            ) : (
              <CustomFormItem
                name={'detailBiography'}
                label={t('biography.biography')}
                rules={[
                  { required: true, message: t('biography.biographyRequired') },
                  {
                    max: 10000,
                    message: t('biography.biographyMax'),
                  },
                  {
                    min: 50,
                    message: t('biography.biographyMin'),
                  },
                ]}
              >
                <TextArea
                  className={`edit-biography-textarea ${isMobile ? 'mobile' : 'desktop'}`}
                  placeholder={t('biography.biographyPlaceholder')}
                  autoSize={{
                    minRows: isMobile ? 6 : 8,
                    maxRows: isMobile ? 15 : 20,
                  }}
                  onChange={handleTextChange}
                  showCount
                  maxLength={10000}
                />
              </CustomFormItem>
            )}
          </Col>
          <Col span={24}>
            <SubmitButton loading={loading} />
          </Col>
        </Row>
      </Form>

      {/* Biography History Panel */}
      {historyVisible && (
        <Card title={t('biography.historyTitle')} style={{ marginTop: 16 }}>
          {biographyHistory.length > 0 ? (
            <div
              className={`edit-biography-history-container ${isMobile ? 'mobile' : 'desktop'}`}
            >
              {biographyHistory.map(history => (
                <Card
                  key={history.id}
                  size='small'
                  className='edit-biography-history-card'
                  actions={[
                    <Button
                      type='link'
                      onClick={() => handleRestoreVersion(history.id)}
                    >
                      {t('biography.restore')}
                    </Button>,
                  ]}
                >
                  <div>
                    <Text strong>
                      {t('biography.version', {
                        number: history.versionNumber,
                      })}
                    </Text>
                    <br />
                    <Text type='secondary'>
                      {new Date(history.createdAt).toLocaleString('mn-MN')}
                    </Text>
                    <br />
                    <Text type='secondary'>{history.changeDescription}</Text>
                    <br />
                    <Paragraph
                      ellipsis={{ rows: 3, expandable: true }}
                      style={{ marginTop: 8 }}
                    >
                      {history.biographyContent}
                    </Paragraph>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Text type='secondary'>{t('biography.historyEmpty')}</Text>
          )}
        </Card>
      )}
    </Layout>
  );
};

export default EditBiography;
