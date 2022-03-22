/**
 * 首字母转小写
 */
const lowerFirst = (str: string) => {
  const arr = str.split("");
  arr[0] = arr[0].toLocaleLowerCase();
  return arr.join("");
};

export { lowerFirst };
