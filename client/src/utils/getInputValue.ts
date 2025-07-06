const SKIP = Symbol('SKIP');

export { SKIP };

export const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { type, checked, value, files } = e.target;

  switch (type) {
    case 'checkbox':
      return checked;
    case 'file':
      if (!files || files.length === 0) return SKIP;
      return files[0];
    default:
      return value;
  }
};
