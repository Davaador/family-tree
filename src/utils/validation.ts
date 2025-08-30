export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{8}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  // Хамгийн багадаа 8 тэмдэгт, том үсэг, жижиг үсэг, тоо агуулсан байх
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterNumber = (register: string): boolean => {
  // Монгол улсын регистрийн дугаарын формат
  const registerRegex = /^[0-9]{10}$/;
  return registerRegex.test(register);
};

export const getValidationMessage = (
  field: string,
  value: string
): string | null => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Зөв и-мэйл хаяг оруулна уу' : null;
    case 'phone':
      return !validatePhone(value)
        ? 'Зөв утасны дугаар оруулна уу (8 орон)'
        : null;
    case 'password':
      return !validatePassword(value)
        ? 'Нууц үг хамгийн багадаа 8 тэмдэгт, том үсэг, жижиг үсэг, тоо агуулсан байх'
        : null;
    case 'register':
      return !validateRegisterNumber(value)
        ? 'Зөв регистрийн дугаар оруулна уу (10 орон)'
        : null;
    default:
      return null;
  }
};
