export const formatDate = (date: Date | null) => {
  if (!date?.getMonth()) return '';

  return `"${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}"`;
};

export const DATEFORMAT = 'yyyy/MM/dd';
