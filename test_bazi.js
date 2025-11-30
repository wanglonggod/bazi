// 测试八字计算
import BaziCalculator from './src/utils/baziCalculator.js';

const calculator = new BaziCalculator();

// 测试用例1：1990年1月1日 00:00
console.log('测试用例1：1990年1月1日 00:00');
try {
  const result1 = calculator.calculateBazi({
    year: 1990,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    gender: 'male'
  });
  console.log('年柱：', result1.yearPillar.full);
  console.log('月柱：', result1.monthPillar.full);
  console.log('日柱：', result1.dayPillar.full);
  console.log('时柱：', result1.hourPillar.full);
  console.log('---');
} catch (error) {
  console.error('错误：', error.message);
}

// 测试用例2：1990年1月27日 12:00
console.log('测试用例2：1990年1月27日 12:00');
try {
  const result2 = calculator.calculateBazi({
    year: 1990,
    month: 1,
    day: 27,
    hour: 12,
    minute: 0,
    gender: 'male'
  });
  console.log('年柱：', result2.yearPillar.full);
  console.log('月柱：', result2.monthPillar.full);
  console.log('日柱：', result2.dayPillar.full);
  console.log('时柱：', result2.hourPillar.full);
  console.log('---');
} catch (error) {
  console.error('错误：', error.message);
}

// 测试用例3：2000年2月5日 15:30
console.log('测试用例3：2000年2月5日 15:30');
try {
  const result3 = calculator.calculateBazi({
    year: 2000,
    month: 2,
    day: 5,
    hour: 15,
    minute: 30,
    gender: 'female'
  });
  console.log('年柱：', result3.yearPillar.full);
  console.log('月柱：', result3.monthPillar.full);
  console.log('日柱：', result3.dayPillar.full);
  console.log('时柱：', result3.hourPillar.full);
} catch (error) {
  console.error('错误：', error.message);
}