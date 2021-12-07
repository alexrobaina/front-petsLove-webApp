export const maskAddress = (address: string): string => {
  if (address === undefined) {
    return '';
  }
  let char = '';
  for (let i = 0; i < address.length - 10; i += 1) {
    char += '*';
  }
  return `${address.substring(0, 5)}${char}${address.substring(
    address.length - 5,
    address.length,
  )}`;
};
