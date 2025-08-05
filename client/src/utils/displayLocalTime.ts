export const displayLocalTime = (stringTime: string) => {
  const date = new Date(stringTime);

  return date?.toLocaleString().replace(',', ' ');
};
