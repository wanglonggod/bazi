import calculator from './src/utils/baziCalculator.js';

console.log('=== 2007年10月3日0点 完整测试 ===');

const birthInfo = {
  year: 2007,
  month: 10,
  day: 3,
  hour: 0,
  gender: 'male'
};

console.log('出生信息:', birthInfo);

try {
  const bazi = calculator.calculateBazi(birthInfo);
  console.log('八字:', bazi.fullBazi);
  console.log('生肖:', bazi.zodiac);
  
  console.log('\n=== 大运信息 ===');
  console.log('起运年龄:', bazi.luckCycle.startInfo.startAge);
  console.log('起运年份:', bazi.luckCycle.startInfo.startYear);
  console.log('大运方向:', bazi.luckCycle.startInfo.direction);
  
  console.log('\n=== 大运周期 ===');
  bazi.luckCycle.luckCycles.forEach((cycle, index) => {
    console.log(`第${index + 1}步大运: ${cycle.period}, ${cycle.pillar.full}, 运势: ${cycle.influence}`);
  });
  
  // 计算当前年龄
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthInfo.year;
  console.log(`\n=== 当前年龄分析 ===`);
  console.log(`当前年份: ${currentYear}`);
  console.log(`当前年龄: ${currentAge}岁`);
  
  // 计算当前大运序号
  const yearsSinceStart = currentAge - bazi.luckCycle.startInfo.startAge;
  const currentCycleIndex = Math.floor(yearsSinceStart / 10);
  console.log(`起运后经过年数: ${yearsSinceStart.toFixed(1)}年`);
  console.log(`当前大运序号: 第${currentCycleIndex + 1}步大运`);
  
  // 找出当前所处的大运
  const currentCycle = bazi.luckCycle.luckCycles[currentCycleIndex];
  if (currentCycle) {
    console.log(`当前大运: ${currentCycle.period}, ${currentCycle.pillar.full}, 运势: ${currentCycle.influence}`);
  } else {
    console.log('未找到当前大运');
  }
  
} catch (error) {
  console.error('计算错误:', error.message);
}