export const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { type, checked, value, files } = e.target;

  switch (type) {
    case 'checkbox':
      return checked;
    case 'file':
      return files?.[0] ?? null;
    default:
      return value;
  }
};
