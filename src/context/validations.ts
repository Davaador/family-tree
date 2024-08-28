const validations = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  email1: /[а-яөӨёЁүҮА-Я\s]/i,
  phoneNumber: /^[0-9]{8}$/,
  register: /^[А-ЯӨҮЁ]{2}[0-9]{8}$/,
  mongolianUpperLetter: /^[А-ЯӨЁҮ]+$/,
};

export default validations;
