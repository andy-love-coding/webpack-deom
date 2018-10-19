// 封装加减乘除的方法
module.exports = {
  plus(num1, num2) {
    // 抛出一个异常
    throw new Error();
    return Number(num1) + Number(num2);
  },
  minus(num1, num2) {
    return Number(num1) - Number(num2);
  },
  multiply(num1, num2) {
    return Number(num1) * Number(num2);
  },
  divide(num1, num2) {
    return Number(num1) / Number(num2);
  },
}