import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Flex, Form, Modal, notification, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { authStore } from 'context/auth/store';
import { apiClient } from 'context/http';
import { editCustomerInfo } from 'context/services/customer.service';
import {
  CustomFormItem,
  CustomInput,
  SubmitButton,
} from 'pages/components/atomics';
import { ImageField } from 'pages/private/private.model';
import { uploadFile } from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EditNameModalProps {
  isShow: boolean;
  toggleModal: Function;
  handleCancel: () => void;
}

const EditNameModal = (props: EditNameModalProps) => {
  const { isShow, toggleModal, handleCancel } = props;
  const { authUser, setAuthUser } = authStore();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const signal = new AbortController();
    if (!authUser?.profileImage) return;
    const uploadFile: UploadFile = {
      uid: authUser.profileImage!.id.toString(),
      name: authUser.profileImage!.name,
      status: 'done',
      url: authUser.profileImage?.url,
      // originFileObj: rcFile,
    };
    setFileList([uploadFile]);
    // apiClient
    //   .get(`/api/file/resource/${authUser.profilePicture.url}`, {
    //     signal: signal.signal,
    //     responseType: 'blob',
    //   })
    //   .then((response: any) => {
    //     const url = URL.createObjectURL(response);
    //     const file = new File([response], 'image.jpg', { type: 'image/jpeg' });
    //     const rcFile = file as RcFile;

    //   })
    //   .catch((e) => {});
    return () => {
      signal.abort();
    };
  }, [authUser]);

  const handleUpload = async ({ file, onSuccess }: UploadRequestOption) => {
    if (onSuccess) {
      onSuccess(file);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values: CustomerDetail) => {
    if (authUser) {
      if (fileList) {
        const val: ImageField = await uploadFile(fileList[0].originFileObj!);
        values.profileImage = val;
      }
      editCustomerInfo(values).then((res: CustomerDetail) => {
        notification.success({
          message: 'Амжилттай',
          description: 'Таны мэдээлэл амжилттай өөрчлөгдлөө!',
        });
        setAuthUser(res);
        toggleModal();
        return;
      });
    }
    toggleModal();
  };
  return (
    <Modal
      title={t('modal.editNameTitle')}
      open={isShow}
      onCancel={handleCancel}
      footer
    >
      <Form
        layout="vertical"
        autoComplete="off"
        initialValues={{ ...authUser }}
        onFinish={onFinish}
      >
        <CustomFormItem name={'profileImage'} label={'Өөрийн зураг'}>
          <Upload
            maxCount={1}
            listType="picture-card"
            accept="image/png, image/jpeg"
            fileList={fileList}
            customRequest={handleUpload}
            onChange={handleChange}
          >
            {fileList?.length >= 1 ? null : (
              <button type="button">
                <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </CustomFormItem>
        <CustomFormItem
          name="surName"
          label={t('register.surName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.surName')} />
        </CustomFormItem>
        <CustomFormItem
          name="lastName"
          label={t('register.lastName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.lastName')} />
        </CustomFormItem>
        <CustomFormItem
          name="firstName"
          label={t('profile.firstName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.firstName')} />
        </CustomFormItem>
        <Flex
          justify="center"
          children={<SubmitButton text={t('general.save')} size="small" />}
        />
      </Form>
    </Modal>
  );
};

export default EditNameModal;
