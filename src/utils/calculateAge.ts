import dayjs from 'dayjs';

export const calculateAge = (date: string) => {
  const currentDate = new Date();
  const birthdate = dayjs(date);
  const yearsOld = birthdate.diff(currentDate, 'year', true);

  return Math.abs(yearsOld).toFixed(1);
};
