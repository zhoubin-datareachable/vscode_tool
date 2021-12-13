/**
 * 补零
 * @param n number
 * @returns
 */
const fillZero = function (n: number) {
  return n < 10 ? `n${n}` : n;
};

/**
 * 获取当前的时间
 * @returns 2021-12-12
 */
const getCurrentDate = function (separate: string) {
  const date = new Date();
  const year = date.getFullYear();
  const month = fillZero(date.getMonth() + 1);
  const day = fillZero(date.getDate());

  return [year, month, day].join(separate);
};

export { getCurrentDate };
