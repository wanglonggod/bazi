import BaziCalculator from './src/utils/baziCalculator.js';

// 测试2007年10月3日0点的起运计算
const year = 2007;
const month = 10;
const day = 3;
const hour = 0;
const gender = 'male';

console.log(`测试生日: ${year}年${month}月${day}日 ${hour}时`);
console.log(`性别: ${gender}`);

// 获取年柱
const yearPillar = BaziCalculator.calculateYearPillar(year, month, day);
console.log(`年柱: ${yearPillar.full} (天干: ${yearPillar.heavenlyStem})`);

// 获取年干信息
const yearStem = yearPillar.heavenlyStem;
const yearStemIndex = BaziCalculator.heavenlyStems.indexOf(yearStem);
const isYearStemYang = yearStemIndex % 2 === 0;

console.log(`年干: ${yearStem} (索引: ${yearStemIndex})`);
console.log(`年干阴阳: ${isYearStemYang ? '阳' : '阴'}`);

// 确定大运方向
const isForward = (isYearStemYang && gender === 'male') || (!isYearStemYang && gender === 'female');
console.log(`大运方向: ${isForward ? '顺行' : '逆行'}`);

// 获取立春日期
let startOfSpringYear = year;
let startOfSpring = BaziCalculator.getStartOfSpring(startOfSpringYear);

console.log(`\n初始立春信息: ${startOfSpringYear}年${startOfSpring.month}月${startOfSpring.day}日`);

// 创建日期对象
const birthDate = new Date(year, month - 1, day);
const springDate = new Date(startOfSpringYear, startOfSpring.month - 1, startOfSpring.day);

console.log(`出生日期: ${birthDate.toLocaleDateString()}`);
console.log(`立春日期: ${springDate.toLocaleDateString()}`);

// 如果生日在立春之前，使用前一年的立春
if (birthDate < springDate) {
  startOfSpringYear = year - 1;
  startOfSpring = BaziCalculator.getStartOfSpring(startOfSpringYear);
  console.log(`生日在立春之前，使用前一年的立春: ${startOfSpringYear}年${startOfSpring.month}月${startOfSpring.day}日`);
}

// 计算从立春到生日的天数差
const daysFromStartOfSpring = BaziCalculator.calculateDaysDifference(
  startOfSpringYear, startOfSpring.month, startOfSpring.day,
  year, month, day
);

console.log(`\n从立春到生日的天数差: ${daysFromStartOfSpring}天`);

// 计算起运年龄
const ageYears = Math.floor(daysFromStartOfSpring / 3);
const remainingDays = daysFromStartOfSpring % 3;
const ageMonths = Math.floor(remainingDays * 4); // 1天=4个月

console.log(`起运年数: ${ageYears}年`);
console.log(`剩余天数: ${remainingDays}天`);
console.log(`起运月数: ${ageMonths}个月`);

// 组合起运年龄
const startAge = ageYears + ageMonths / 12;
const startYear = year + ageYears;

console.log(`\n起运年龄: ${startAge}岁 (约${startAge.toFixed(2)}岁)`);
console.log(`起运年份: ${startYear}年`);

// 让我们也检查一下实际的立春日期
console.log(`\n--- 检查实际的2007年立春 ---`);
const spring2007 = BaziCalculator.getStartOfSpring(2007);
console.log(`2007年立春: ${spring2007.month}月${spring2007.day}日`);

const spring2006 = BaziCalculator.getStartOfSpring(2006);
console.log(`2006年立春: ${spring2006.month}月${spring2006.day}日`);

// 检查是否是闰年
console.log(`2007年是闰年: ${BaziCalculator.isLeapYear(2007)}`);
console.log(`2006年是闰年: ${BaziCalculator.isLeapYear(2006)}`);