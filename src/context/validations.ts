// const validations = {
//   email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//   email1: /[а-яөӨёЁүҮА-Я\s]/i,
//   phoneNumber: /^[0-9]{8}$/,
//   register: /^[А-ЯӨҮЁ]{2}[0-9]{8}$/,
//   mongolianUpperLetter: /^[А-ЯӨЁҮ]+$/,
// };

import { Rule } from 'antd/es/form';

// export default validations;

// context/validations.ts

// Regex-үүд
const regex = {
  phoneNumber: /^[0-9]{8}$/, // Монголын утасны дугаарын жишээ
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  register: /^[А-ЯӨҮЁ]{2}[0-9]{8}$/,
  mongolianUpperLetter: /^[А-ЯӨЁҮ]+$/,
};

// AntD Rules Generator
const rules = {
  required: (message: string) => [{ required: true, message }],
  minLength: (min: number, message: string) => [{ min, message }],
  maxLength: (max: number, message: string) => [{ max, message }],
  pattern: (pattern: RegExp, message: string) => [{ pattern, message }],

  // Түгээмэл талбарууд
  name: (t: any) => [
    { required: true, message: t('register.enterName') },
    { min: 2, message: t('register.min2Char') },
  ],

  surName: (t: any) => [
    { required: true, message: t('register.enterSurName') },
    { min: 2, message: t('register.min2Char') },
  ],

  phoneNumber: (t: any) => [
    { required: true, message: t('register.enterPhone') },
    { pattern: regex.phoneNumber, message: t('register.enterPhoneRegex') },
  ],

  email: (t: any): Rule[] => [
    { type: 'email' as const, message: t('register.enterValidEmail') },
  ],

  password: (t: any) => [
    { required: true, message: t('register.enterPassword') },
    { min: 8, message: t('register.enterNewPasswordRegex') },
  ],

  confirmPassword: (t: any) => [
    { required: true, message: t('register.confirmPasswordRequired') },
    ({ getFieldValue }: any) => ({
      validator(_: any, value: string) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('register.matchOldPassword')));
      },
    }),
  ],

  birthDate: (t: any) => [
    { required: true, message: t('register.enterBirthDate') },
  ],
};
const validations = {
  rules,
  regex,
};
export default validations;
