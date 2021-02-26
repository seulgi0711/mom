export const within = (min: number, max: number) => (value: number) => {
  return min <= value && max >= value;
};
