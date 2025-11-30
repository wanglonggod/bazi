import BaziCalculator from './src/utils/baziCalculator.js';

// 测试2007年10月3日0点的起运计算 - 修正版本
const year = 2007;
const month = 10;
const day = 3;
const hour = 0;
const gender = 'male';

console.log(`测试生日: ${year}年${month}月${day}日 ${hour}时`);
console.log(`性别: ${gender}`);

// 获取年柱和月柱
const yearPillar = BaziCalculator.calculateYearPillar(year, month, day);
const monthPillar = BaziCalculator.calculateMonthPillar(year, month, day);

console.log(`年柱: ${yearPillar.full} (天干: ${yearPillar.heavenlyStem})`);
console.log(`月柱: ${monthPillar.full}`);

// 获取年干信息
const yearStem = yearPillar.heavenlyStem;
const yearStemIndex = BaziCalculator.heavenlyStems.indexOf(yearStem);
const isYearStemYang = yearStemIndex % 2 === 0;

console.log(`年干: ${yearStem} (索引: ${yearStemIndex})`);
console.log(`年干阴阳: ${isYearStemYang ? '阳' : '阴'}`);

// 确定大运方向
const isForward = (isYearStemYang && gender === 'male') || (!isYearStemYang && gender === 'female');
console.log(`大运方向: ${isForward ? '顺行' : '逆行'}`);

// 获取当前节气信息
const birthDate = new Date(year, month - 1, day);
console.log(`出生日期: ${birthDate.toLocaleDateString()}`);

// 获取月柱信息
console.log(`\n--- 月柱信息 ---`);
console.log(`当前月柱: ${monthPillar.full}`);

// 检查月柱计算是否正确
const expectedMonthStemIndex = (2 + (month - 1) * 2) % 10; // 简单的五虎遁验证
console.log(`预期的月干索引: ${expectedMonthStemIndex}`);
console.log(`实际的月干: ${monthPillar.heavenlyStem}`);
console.log(`实际的月干索引: ${BaziCalculator.heavenlyStems.indexOf(monthPillar.heavenlyStem)}`);

// 让我们看看大运是如何计算的
console.log(`\n--- 大运计算 ---`);

// 获取正确的起运信息
const luckCycle = BaziCalculator.calculateStartOfLuckCycle(year, month, day, gender);
console.log(`起运年龄: ${luckCycle.startAge}岁`);
console.log(`起运年份: ${luckCycle.startYear}年`);
console.log(`方向: ${luckCycle.direction}`);

// 让我们手动计算正确的大运
console.log(`\n--- 手动大运计算 ---`);

// 传统方法：从出生后的下一个节气开始计算大运
// 对于2007年10月3日，我们需要找到出生后的节气

// 获取当年的节气信息
const solarterms = BaziCalculator.getYearSolarterms(year);
console.log(`2007年主要节气:`);
Object.keys(solarterms).forEach(term => {
  if (['立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '霜降', '立冬', '大雪'].includes(term)) {
    console.log(`  ${term}: ${solarterms[term].month}月${solarterms[term].day}日`);
  }
});

// 让我们看看实际的计算哪里出了问题
console.log(`\n--- 问题分析 ---`);
console.log(`当前计算从立春到生日的天数: ${luckCycle.years * 3 + luckCycle.months / 4}天`);
console.log(`但这应该是从出生到第一个大运的时间，而不是从立春到生日的时间`);

// 正确的逻辑应该是：
// 1. 找到出生后的第一个节气
// 2. 计算从出生到该节气的天数
// 3. 根据这个天数计算起运年龄

const currentSolarterm = BaziCalculator.getCurrentSolartermRange(year, month, day);
console.log(`\n当前节气区间:`);
console.log(`当前: ${currentSolarterm.current}`);
console.log(`下一个: ${currentSolarterm.next}`);
console.log(`开始: ${currentSolarterm.startDate.toLocaleDateString()}`);
console.log(`结束: ${currentSolarterm.endDate.toLocaleDateString()}`);