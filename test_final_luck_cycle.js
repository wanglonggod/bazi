import BaziCalculator from './src/utils/baziCalculator.js';

// 测试2007年10月3日0点的起运计算 - 最终修正版本
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

// 获取修正后的起运信息
const luckCycle = BaziCalculator.calculateStartOfLuckCycle(year, month, day, gender);
console.log(`\n=== 修正后的起运计算 ===`);
console.log(`起运年龄: ${luckCycle.startAge}岁 (${luckCycle.years}年${luckCycle.months}个月)`);
console.log(`起运年份: ${luckCycle.startYear}年`);
console.log(`方向: ${luckCycle.direction}`);
console.log(`距离参考节气天数: ${luckCycle.daysToTerm}天`);
console.log(`参考节气: ${luckCycle.referenceTerm}`);

// 计算当前年龄
const currentDate = new Date();
const birthDate = new Date(year, month - 1, day);
const ageInYears = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
console.log(`\n当前实际年龄: ${ageInYears.toFixed(1)}岁`);

// 计算当前大运（修正版）
const yearsSinceStart = ageInYears - luckCycle.startAge;
const currentLuckCycleIndex = Math.floor(yearsSinceStart / 10);
console.log(`\n=== 当前大运分析 ===`);
console.log(`起运后经过的年数: ${yearsSinceStart.toFixed(1)}年`);
console.log(`当前大运序号: 第${currentLuckCycleIndex + 1}步大运`);

if (yearsSinceStart >= 0) {
  const currentStartAge = luckCycle.startAge + currentLuckCycleIndex * 10;
  const currentEndAge = currentStartAge + 9;
  console.log(`当前大运年龄范围: ${currentStartAge} - ${currentEndAge}岁`);
  
  // 获取当前大运的干支
  const currentLuckPillar = BaziCalculator.calculateLuckPillar(monthPillar, currentLuckCycleIndex, luckCycle.isForward);
  console.log(`当前大运: ${currentLuckPillar.full}`);
} else {
  console.log(`还未开始行大运，将在${luckCycle.startAge}岁开始`);
}

// 让我们看看大运列表
console.log(`\n=== 大运列表 ===`);
const dayPillar = BaziCalculator.calculateDayPillar(year, month, day);
console.log(`日柱: ${dayPillar.full}`);

// 生成大运（以月柱为起点）
for (let i = 0; i < 8; i++) {
  const luckPillar = BaziCalculator.calculateLuckPillar(monthPillar, i, luckCycle.isForward);
  const startAge = Math.floor(luckCycle.startAge) + i * 10;
  const endAge = startAge + 9;
  const isCurrent = i === currentLuckCycleIndex;
  console.log(`${isCurrent ? '👉 ' : '   '}第${i + 1}步大运 (${startAge}-${endAge}岁): ${luckPillar.full} ${isCurrent ? '[当前大运]' : ''}`);
}