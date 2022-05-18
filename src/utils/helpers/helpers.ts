export const formatDate = (date: Date | null) => {
  if (!date?.getMonth()) return '';
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  if (parseInt(month) < 10) month = `0${month}`;
  if (parseInt(day) < 10) day = `0${day}`;
  return `${date?.getFullYear()}/${month}/${day}`;
};

export const DATEFORMAT = 'yyyy/MM/dd';
