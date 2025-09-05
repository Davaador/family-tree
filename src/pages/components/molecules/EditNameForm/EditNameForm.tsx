import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import { authStore } from 'context/auth/store';
import { t } from 'i18next';
import { FormInput, SubmitButton } from 'pages/components/atomics';

const EditNameForm = () => {
  const { authUser } = authStore();
  const onFinishName = (_values: any) => {};

  return (
    <Flex className='mt-20' align='flex-end'>
      <Form
        initialValues={{
          lastName: authUser?.lastName,
          firstName: authUser?.firstName,
        }}
        autoComplete='off'
        layout='inline'
        onFinish={onFinishName}
      >
        <FormInput
          holder={t('register.lastName')}
          label={t('register.lastName')}
          layout='vertical'
          name={'lastName'}
        />
        <FormInput
          holder={t('profile.firstName')}
          label={t('profile.firstName')}
          layout='vertical'
          name={'firstName'}
        />
        <SubmitButton className='alignEnd' text={t('general.save')} />
      </Form>
    </Flex>
  );
};

export default EditNameForm;
