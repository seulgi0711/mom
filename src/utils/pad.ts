const appendChar = (count: number, char: string, str: string): string => {
  const charCount = count - str.length;
  const chars = new Array(charCount).fill(char).join('');
  return chars.concat(str);
};

export const padLeft = (count: number, char: string, str: string): string => {
  return str.length >= count ? str : appendChar(count, char, str);
};
