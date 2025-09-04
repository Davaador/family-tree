import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Flex, Form, Modal, notification, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { authStore } from 'context/auth/store';
import { editCustomerInfo } from 'context/services/customer.service';
import {
  CustomFormItem,
  CustomInput,
  SubmitButton,
  FormRegisterInput,
} from 'pages/components/atomics';
import { ImageField } from 'pages/private/private.model';
import { uploadFile } from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/es/form/Form';

interface EditNameModalProps {
  isShow: boolean;
  toggleModal: Function;
  handleCancel: () => void;
}

const EditNameModal = (props: EditNameModalProps) => {
  const { isShow, toggleModal, handleCancel } = props;
  const { authUser, setAuthUser } = authStore();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = useForm();

  const { t } = useTranslation();

  useEffect(() => {
    console.log('EditNameModal authUser?.register:', authUser?.register);
  }, [authUser]);

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
    if (!authUser) return;

    try {
      // Хэрэв зураг байгаа бол upload хийх
      if (fileList && fileList.length > 0 && fileList[0].originFileObj) {
        const val: ImageField = await uploadFile(fileList[0].originFileObj);
        values.profileImage = val;
      } else if (fileList.length === 0) {
        // Хоосон байвал зураггүй гэсэн утга өгч болох юм
        values.profileImage = undefined; // эсвэл өмнөх утгыг хадгалах
      } else {
        values.profileImage = authUser.profileImage;
      }

      const res: CustomerDetail = await editCustomerInfo(values);

      notification.success({
        message: 'Амжилттай',
        description: 'Таны мэдээлэл амжилттай өөрчлөгдлөө!',
      });

      setAuthUser(res);
    } catch (error) {
      notification.error({
        message: 'Алдаа',
        description: 'Мэдээлэл хадгалахад алдаа гарлаа',
      });
    } finally {
      toggleModal();
    }
  };

  return (
    <Modal
      title={t('modal.editNameTitle')}
      open={isShow}
      onCancel={handleCancel}
      footer
      width={600}
      style={{ maxWidth: '90vw' }}
    >
      <Form
        form={form}
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
        <FormRegisterInput
          form={form}
          name="register"
          defaultValue={authUser?.register}
          label={t('register.registerNumber')}
          required={true}
          layout="vertical"
          showIcon={true}
          placeholder={t('register.registerNumberPlaceholder')}
          className="w-full"
        />
        <Flex
          justify="center"
          children={<SubmitButton text={t('general.save')} size="small" />}
        />
      </Form>
    </Modal>
  );
};

export default EditNameModal;
