// 导入计算方法
// 注意：require关键字需要node环境中有效，在浏览器中执行会报错：require is not defined
// 解决：通过打包可以将node中的代码打包为浏览器识别的代码
var calc = require('@/calc');

// 导入css样式
import '@/assets/index.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.css'; // 会包含字体

// 得到所有dom对象
var t1 = document.getElementById('t1');
var t2 = document.getElementById('t2');
var t3 = document.getElementById('t3');
var s1 = document.getElementById('s1');
var s2 = document.getElementById('s2');

// 创建一个对象
let name = '张三';
let age = 19;

// 使用es6的语法
const obj = {
  name,
  age,
  sayHi() {
    console.log(this.name, this.age);
    return () => {
      console.log(this.name);
    }
  }
}

// 完成计算功能
s2.onclick = function() {
  var val1 = t1.value;
  var val2 = t2.value;
  var option = s1.value;
  // console.log(val1,val2,option);
  var result;
  switch(option) {
    case '+':
      result = calc.plus(val1, val2);
      break;
    case '-':
      result = calc.minus(val1, val2);
      break;
    case '*':
      result = calc.multiply(val1, val2);
      break;
    case '/':
      result = calc.divide(val1, val2);
      break;
  }
  t3.innerHTML = result;
}
console.log('aaa');