export const randomRange = (min: number, max: number) => {
  const minNum = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minNum)) + minNum; //최댓값은 제외, 최솟값은 포함
};
