import { Col, Flex, FormInstance, Row } from 'antd';
import { authStore } from 'context/auth/store';
import { t } from 'i18next';
import {
  CustomFormItem,
  CustomInput,
  FormBirthDate,
  FormRegisterInput,
} from 'pages/components/atomics';

interface EditFormProps {
  form: FormInstance;
}

const EditPhoneForm = (props: EditFormProps) => {
  const { form } = props;
  const { authUser } = authStore();

  return (
    <Flex>
      <Row gutter={[24, 12]}>
        <Col xs={24} sm={12}>
          <CustomFormItem
            layout='vertical'
            label={t('profile.email')}
            name={'email'}
          >
            <CustomInput placeholder={t('profile.email')} />
          </CustomFormItem>
        </Col>
        <Col xs={24} sm={12}>
          <CustomFormItem
            layout='vertical'
            label={t('register.phoneNumber')}
            name={'phoneNumber'}
          >
            <CustomInput placeholder={t('register.phoneNumber')} />
          </CustomFormItem>
        </Col>
        <Col xs={24} sm={24}>
          <FormRegisterInput form={form} defaultValue={authUser?.register} />
        </Col>
        <Col xs={24} sm={12}>
          <FormBirthDate
            format={'YYYY-MM-DD'}
            label={t('profile.birthDate')}
            layout='vertical'
            name={'birthDate'}
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default EditPhoneForm;
