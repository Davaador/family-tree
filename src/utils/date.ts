import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date,
  format: string = 'YYYY-MM-DD'
): string => {
  return dayjs(date).format(format);
};

export const calculateAge = (birthDate: string | Date): number => {
  return dayjs().diff(dayjs(birthDate), 'year');
};

export const isValidDate = (date: string | Date): boolean => {
  return dayjs(date).isValid();
};

export const getDateRange = (
  startDate: string | Date,
  endDate: string | Date
) => {
  return {
    start: dayjs(startDate).startOf('day'),
    end: dayjs(endDate).endOf('day'),
  };
};
