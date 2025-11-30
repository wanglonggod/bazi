import { heavenlyStems, earthlyBranches, zodiacAnimals, fiveElements } from './theme.js';

/**
 * 八字计算器核心类
 */
class BaziCalculator {
  constructor() {
    // 初始化基础数据
    this.heavenlyStems = heavenlyStems;
    this.earthlyBranches = earthlyBranches;
    this.zodiacAnimals = zodiacAnimals;
    
    // 24节气定义
    this.solarterms = [
      '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
      '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
      '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
      '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
    ];
    
    // 立春日期数据（1950-2050年）
    this.startOfSpring = {};
    
    // 使用规律添加立春数据
    // 立春通常在2月3日、4日或5日
    // 按照实际历法规律添加关键年份数据
    const springData = {
      1950: { month: 2, day: 4 }, 1951: { month: 2, day: 4 }, 1952: { month: 2, day: 5 },
      1953: { month: 2, day: 4 }, 1954: { month: 2, day: 4 }, 1955: { month: 2, day: 4 },
      1956: { month: 2, day: 5 }, 1957: { month: 2, day: 4 }, 1958: { month: 2, day: 4 },
      1959: { month: 2, day: 4 }, 1960: { month: 2, day: 5 }, 1961: { month: 2, day: 4 },
      1962: { month: 2, day: 4 }, 1963: { month: 2, day: 4 }, 1964: { month: 2, day: 5 },
      1965: { month: 2, day: 4 }, 1966: { month: 2, day: 4 }, 1967: { month: 2, day: 4 },
      1968: { month: 2, day: 5 }, 1969: { month: 2, day: 4 }, 1970: { month: 2, day: 4 },
      1971: { month: 2, day: 4 }, 1972: { month: 2, day: 5 }, 1973: { month: 2, day: 4 },
      1974: { month: 2, day: 4 }, 1975: { month: 2, day: 4 }, 1976: { month: 2, day: 5 },
      1977: { month: 2, day: 4 }, 1978: { month: 2, day: 4 }, 1979: { month: 2, day: 4 },
      1980: { month: 2, day: 5 }, 1981: { month: 2, day: 4 }, 1982: { month: 2, day: 4 },
      1983: { month: 2, day: 4 }, 1984: { month: 2, day: 5 }, 1985: { month: 2, day: 4 },
      1986: { month: 2, day: 4 }, 1987: { month: 2, day: 4 }, 1988: { month: 2, day: 5 },
      1989: { month: 2, day: 4 }, 1990: { month: 2, day: 4 }, 1991: { month: 2, day: 4 },
      1992: { month: 2, day: 4 }, 1993: { month: 2, day: 4 }, 1994: { month: 2, day: 4 },
      1995: { month: 2, day: 4 }, 1996: { month: 2, day: 4 }, 1997: { month: 2, day: 4 },
      1998: { month: 2, day: 4 }, 1999: { month: 2, day: 4 }, 2000: { month: 2, day: 4 },
      2001: { month: 2, day: 4 }, 2002: { month: 2, day: 4 }, 2003: { month: 2, day: 4 },
      2004: { month: 2, day: 4 }, 2005: { month: 2, day: 4 }, 2006: { month: 2, day: 4 },
      2007: { month: 2, day: 4 }, 2008: { month: 2, day: 4 }, 2009: { month: 2, day: 4 },
      2010: { month: 2, day: 4 }, 2011: { month: 2, day: 4 }, 2012: { month: 2, day: 4 },
      2013: { month: 2, day: 4 }, 2014: { month: 2, day: 4 }, 2015: { month: 2, day: 4 },
      2016: { month: 2, day: 4 }, 2017: { month: 2, day: 3 }, 2018: { month: 2, day: 4 },
      2019: { month: 2, day: 4 }, 2020: { month: 2, day: 4 }, 2021: { month: 2, day: 3 },
      2022: { month: 2, day: 4 }, 2023: { month: 2, day: 4 }, 2024: { month: 2, day: 4 },
      2025: { month: 2, day: 3 }, 2026: { month: 2, day: 4 }, 2027: { month: 2, day: 4 },
      2028: { month: 2, day: 4 }, 2029: { month: 2, day: 3 }, 2030: { month: 2, day: 4 },
      2031: { month: 2, day: 4 }, 2032: { month: 2, day: 4 }, 2033: { month: 2, day: 3 },
      2034: { month: 2, day: 4 }, 2035: { month: 2, day: 4 }, 2036: { month: 2, day: 4 },
      2037: { month: 2, day: 3 }, 2038: { month: 2, day: 4 }, 2039: { month: 2, day: 4 },
      2040: { month: 2, day: 4 }, 2041: { month: 2, day: 3 }, 2042: { month: 2, day: 4 },
      2043: { month: 2, day: 4 }, 2044: { month: 2, day: 4 }, 2045: { month: 2, day: 3 },
      2046: { month: 2, day: 4 }, 2047: { month: 2, day: 4 }, 2048: { month: 2, day: 4 },
      2049: { month: 2, day: 3 }, 2050: { month: 2, day: 4 }
    };
    
    // 合并数据到this.startOfSpring
    Object.assign(this.startOfSpring, springData);
    
    // 月柱索引对应表
    this.monthStemIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // 农历月份与节气对应关系
    this.lunarMonthSolarterm = [
      { start: '立春', end: '惊蛰', month: 1 },
      { start: '惊蛰', end: '清明', month: 2 },
      { start: '清明', end: '立夏', month: 3 },
      { start: '立夏', end: '芒种', month: 4 },
      { start: '芒种', end: '小暑', month: 5 },
      { start: '小暑', end: '立秋', month: 6 },
      { start: '立秋', end: '白露', month: 7 },
      { start: '白露', end: '寒露', month: 8 },
      { start: '寒露', end: '立冬', month: 9 },
      { start: '立冬', end: '大雪', month: 10 },
      { start: '大雪', end: '小寒', month: 11 },
      { start: '小寒', end: '立春', month: 12 }
    ];
  }
  
  /**
   * 计算完整的八字信息
   * @param {Object} birthInfo - 出生信息 {year, month, day, hour, minute, gender}
   * @returns {Object} 八字计算结果
   */
  calculateBazi(birthInfo) {
    // 添加输入验证
    if (!birthInfo || typeof birthInfo !== 'object') {
      throw new Error('出生信息必须是一个有效的对象');
    }
    
    const { year, month, day, hour } = birthInfo;
    
    // 验证必要的日期字段
    if (!year || !month || !day || hour === undefined) {
      throw new Error('出生信息必须包含年、月、日和时辰');
    }
    
    // 验证日期的有效性
    if (year < 1900 || year > 2100 || 
        month < 1 || month > 12 || 
        day < 1 || day > 31 || 
        hour < 0 || hour > 23) {
      throw new Error('请输入有效的日期和时间');
    }
    
    // 计算年柱
    const yearPillar = this.calculateYearPillar(year, month, day);
    
    // 计算月柱
    const monthPillar = this.calculateMonthPillar(yearPillar.heavenlyStem, year, month, day);
    
    // 计算日柱
    const dayPillar = this.calculateDayPillar(year, month, day);
    
    // 计算时柱
    const hourPillar = this.calculateHourPillar(dayPillar.heavenlyStem, hour);
    
    // 计算五行属性
    const fiveElementsInfo = this.calculateFiveElements(yearPillar, monthPillar, dayPillar, hourPillar);
    
    // 计算日元信息
    const dayMasterInfo = this.calculateDayMaster(dayPillar.heavenlyStem);
    
    // 计算大运（简化版）
    const luckCycle = this.calculateLuckCycle(birthInfo, dayMasterInfo);
    
    return {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      fullBazi: `${yearPillar.full}${monthPillar.full}${dayPillar.full}${hourPillar.full}`,
      fiveElements: fiveElementsInfo,
      dayMaster: dayMasterInfo,
      luckCycle,
      zodiac: this.zodiacAnimals[yearPillar.earthlyBranch]
    };
  }
  
  /**
   * 计算年柱
   * @param {number} year - 年份
   * @param {number} month - 月份
   * @param {number} day - 日期
   * @returns {Object} 年柱信息
   */
  calculateYearPillar(year, month, day) {
    // 确定农历年份（考虑立春）
    let lunarYear = year;
    const spring = this.getStartOfSpring(year);
    if (month < spring.month || (month === spring.month && day < spring.day)) {
      lunarYear = year - 1;
    }
    
    // 计算天干地支
    const heavenlyIndex = (lunarYear - 4) % 10;
    const earthlyIndex = (lunarYear - 4) % 12;
    
    return {
      heavenlyStem: this.heavenlyStems[heavenlyIndex],
      earthlyBranch: this.earthlyBranches[earthlyIndex],
      full: this.heavenlyStems[heavenlyIndex] + this.earthlyBranches[earthlyIndex],
      element: this.getStemElement(this.heavenlyStems[heavenlyIndex])
    };
  }
  
  /**
   * 计算月柱
   * @param {string} yearStem - 年天干
   * @param {number} year - 年份
   * @param {number} month - 月份
   * @param {number} day - 日期
   * @returns {Object} 月柱信息
   */
  calculateMonthPillar(yearStem, year, month, day) {
    // 确定农历月份（基于节气）
    const lunarMonth = this.getLunarMonth(year, month, day);
    
    // 使用五虎遁法计算月天干
    // 五虎遁法：甲己之年丙作首，乙庚之年戊为头，丙辛之岁寻庚上，丁壬壬寅顺水流，若问戊癸何处起，甲寅之上好追求
    // 修正：使用正确的月份索引，农历12月对应索引11
    let monthStemIndex;
    const monthIndex = lunarMonth === 12 ? 11 : lunarMonth - 1; // 将12月映射到索引11
    
    switch (yearStem) {
      case '甲':
      case '己':
        monthStemIndex = (2 + monthIndex) % 10; // 丙为头，索引为2
        break;
      case '乙':
      case '庚':
        monthStemIndex = (4 + monthIndex) % 10; // 戊为头，索引为4
        break;
      case '丙':
      case '辛':
        monthStemIndex = (6 + monthIndex) % 10; // 庚为头，索引为6
        break;
      case '丁':
      case '壬':
        monthStemIndex = (8 + monthIndex) % 10; // 壬为头，索引为8
        break;
      case '戊':
      case '癸':
        monthStemIndex = (0 + monthIndex) % 10; // 甲为头，索引为0
        break;
      default:
        monthStemIndex = 0;
    }
    
    // 月地支固定对应农历月份（寅月为正月）
    const monthBranchIndex = (lunarMonth + 1) % 12;
    
    return {
      heavenlyStem: this.heavenlyStems[monthStemIndex],
      earthlyBranch: this.earthlyBranches[monthBranchIndex],
      full: this.heavenlyStems[monthStemIndex] + this.earthlyBranches[monthBranchIndex],
      element: this.getStemElement(this.heavenlyStems[monthStemIndex])
    };
  }
  
  /**
   * 根据节气确定农历月份
   * 基于24节气中的12个中气来划分农历月份
   * 寅月（正月）：立春-惊蛰
   * 卯月（二月）：惊蛰-清明
   * 辰月（三月）：清明-立夏
   * 巳月（四月）：立夏-芒种
   * 午月（五月）：芒种-小暑
   * 未月（六月）：小暑-立秋
   * 申月（七月）：立秋-白露
   * 酉月（八月）：白露-寒露
   * 戌月（九月）：寒露-立冬
   * 亥月（十月）：立冬-大雪
   * 子月（冬月）：大雪-小寒
   * 丑月（腊月）：小寒-立春
   */
  getLunarMonth(year, month, day) {
    const birthDate = new Date(year, month - 1, day);
    
    // 获取当前年份和前一年的节气
    const currentYearSolarterms = this.getYearSolarterms(year);
    const lastYearSolarterms = this.getYearSolarterms(year - 1);
    const nextYearSolarterms = this.getYearSolarterms(year + 1);
    
    // 检查是否在立春节气前（属于前一年的腊月）
    const springDate = new Date(year, currentYearSolarterms.立春.month - 1, currentYearSolarterms.立春.day);
    if (birthDate < springDate) {
      return 12; // 丑月（腊月）
    }
    
    // 寅月（正月）：立春-惊蛰
    const jingZheDate = new Date(year, currentYearSolarterms.惊蛰.month - 1, currentYearSolarterms.惊蛰.day);
    if (birthDate < jingZheDate) {
      return 1; // 寅月
    }
    
    // 卯月（二月）：惊蛰-清明
    const qingMingDate = new Date(year, currentYearSolarterms.清明.month - 1, currentYearSolarterms.清明.day);
    if (birthDate < qingMingDate) {
      return 2; // 卯月
    }
    
    // 辰月（三月）：清明-立夏
    const liXiaDate = new Date(year, currentYearSolarterms.立夏.month - 1, currentYearSolarterms.立夏.day);
    if (birthDate < liXiaDate) {
      return 3; // 辰月
    }
    
    // 巳月（四月）：立夏-芒种
    const mangZhongDate = new Date(year, currentYearSolarterms.芒种.month - 1, currentYearSolarterms.芒种.day);
    if (birthDate < mangZhongDate) {
      return 4; // 巳月
    }
    
    // 午月（五月）：芒种-小暑
    const xiaoShuDate = new Date(year, currentYearSolarterms.小暑.month - 1, currentYearSolarterms.小暑.day);
    if (birthDate < xiaoShuDate) {
      return 5; // 午月
    }
    
    // 未月（六月）：小暑-立秋
    const liQiuDate = new Date(year, currentYearSolarterms.立秋.month - 1, currentYearSolarterms.立秋.day);
    if (birthDate < liQiuDate) {
      return 6; // 未月
    }
    
    // 申月（七月）：立秋-白露
    const baiLuDate = new Date(year, currentYearSolarterms.白露.month - 1, currentYearSolarterms.白露.day);
    if (birthDate < baiLuDate) {
      return 7; // 申月
    }
    
    // 酉月（八月）：白露-寒露
    const hanLuDate = new Date(year, currentYearSolarterms.寒露.month - 1, currentYearSolarterms.寒露.day);
    if (birthDate < hanLuDate) {
      return 8; // 酉月
    }
    
    // 戌月（九月）：寒露-立冬
    const liDongDate = new Date(year, currentYearSolarterms.立冬.month - 1, currentYearSolarterms.立冬.day);
    if (birthDate < liDongDate) {
      return 9; // 戌月
    }
    
    // 亥月（十月）：立冬-大雪
    const daXueDate = new Date(year, currentYearSolarterms.大雪.month - 1, currentYearSolarterms.大雪.day);
    if (birthDate < daXueDate) {
      return 10; // 亥月
    }
    
    // 子月（冬月）：大雪-小寒
    const xiaoHanDate = new Date(year, currentYearSolarterms.小寒.month - 1, currentYearSolarterms.小寒.day);
    if (birthDate < xiaoHanDate) {
      return 11; // 子月
    }
    
    // 丑月（腊月）：小寒-立春
    return 12; // 丑月
  }
  
  /**
   * 获取年份的节气数据
   * 这里提供简化版的节气数据，实际应用中应该使用更精确的数据或算法
   */
  getYearSolarterms(year) {
    // 基础节气数据（1950-2050年的主要节气日期）
    const solartermsBase = {
      // 固定节气日期（实际应用中需要更精确的数据）
      立春: { month: 2, day: 4 },
      惊蛰: { month: 3, day: 6 },
      清明: { month: 4, day: 5 },
      立夏: { month: 5, day: 6 },
      芒种: { month: 6, day: 6 },
      小暑: { month: 7, day: 7 },
      立秋: { month: 8, day: 8 },
      白露: { month: 9, day: 8 },
      寒露: { month: 10, day: 8 },
      立冬: { month: 11, day: 7 },
      大雪: { month: 12, day: 7 },
      小寒: { month: 1, day: 6 }
    };
    
    // 闰年调整
    if (this.isLeapYear(year)) {
      // 闰年时某些节气日期需要调整
      const leapAdjustments = {
        清明: { month: 4, day: 4 },
        小满: { month: 5, day: 21 },
        夏至: { month: 6, day: 21 },
        处暑: { month: 8, day: 23 },
        秋分: { month: 9, day: 23 },
        霜降: { month: 10, day: 23 },
        冬至: { month: 12, day: 21 }
      };
      Object.assign(solartermsBase, leapAdjustments);
    }
    
    // 21世纪的节气日期微调
    if (year >= 2000) {
      const centuryAdjustments = {
        立春: { month: 2, day: year % 4 === 1 ? 3 : 4 },
        惊蛰: { month: 3, day: 5 },
        清明: { month: 4, day: 4 },
        立冬: { month: 11, day: 7 },
        大雪: { month: 12, day: 7 }
      };
      Object.assign(solartermsBase, centuryAdjustments);
    }
    
    return solartermsBase;
  }
  
  /**
   * 计算日柱
   * 使用准确的60甲子循环计算方法
   * @param {number} year - 年份
   * @param {number} month - 月份
   * @param {number} day - 日期
   * @returns {Object} 日柱信息
   */
  calculateDayPillar(year, month, day) {
    // 使用已知的准确基准日：1990年1月27日为壬辰日
    // 这是一个经过验证的基准点，用于准确计算日柱
    const baseYear = 1990;
    const baseMonth = 1;
    const baseDay = 27;
    const baseStemIndex = 8; // 壬的索引
    const baseBranchIndex = 4; // 辰的索引
    
    // 计算从基准日到目标日的天数差
    const daysDiff = this.calculateDaysDifference(baseYear, baseMonth, baseDay, year, month, day);
    
    // 60甲子循环
    const cycleDays = 60;
    let adjustedDiff = daysDiff % cycleDays;
    if (adjustedDiff < 0) {
      adjustedDiff += cycleDays; // 处理负数情况
    }
    
    // 计算目标日的天干地支索引
    // 天干10个一轮回，地支12个一轮回
    // 注意：这里必须确保天干地支的计算是同步的，遵循60甲子的顺序
    const dayStemIndex = (baseStemIndex + adjustedDiff) % 10;
    const dayBranchIndex = (baseBranchIndex + adjustedDiff) % 12;
    
    return {
      heavenlyStem: this.heavenlyStems[dayStemIndex],
      earthlyBranch: this.earthlyBranches[dayBranchIndex],
      full: this.heavenlyStems[dayStemIndex] + this.earthlyBranches[dayBranchIndex],
      element: this.getStemElement(this.heavenlyStems[dayStemIndex])
    };
  }
  
  /**
   * 计算两个日期之间的精确天数差
   * 使用更准确的日期计算方法
   */
  calculateDaysDifference(startYear, startMonth, startDay, endYear, endMonth, endDay) {
    // 创建日期对象（注意：JavaScript的月份是从0开始的）
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    // 计算时间差（毫秒）
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    // 转换为天数
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  }
  
  /**
   * 判断是否为闰年
   */
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  /**
   * 获取指定月份的天数
   */
  getDaysInMonth(year, month) {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month];
  }
  
  /**
   * 计算时柱
   * 使用准确的五子遁规则：甲己还加甲，乙庚丙作初，丙辛从戊起，丁壬庚子居，戊癸何方发，壬子是真途
   * @param {string} dayStem - 日天干
   * @param {number} hour - 小时（24小时制）
   * @returns {Object} 时柱信息
   */
  calculateHourPillar(dayStem, hour) {
    // 检查输入有效性
    if (!dayStem || hour < 0 || hour > 23) {
      throw new Error('无效的输入参数');
    }
    
    // 根据日柱天干确定子时天干的起始索引
    // 五子遁规则实现
    const getZiHourStemIndex = (dayStem) => {
      const stemIndex = this.heavenlyStems.indexOf(dayStem);
      if (stemIndex === -1) {
        throw new Error('无效的日柱天干');
      }
      
      // 五子遁规则：甲己还加甲，乙庚丙作初，丙辛从戊起，丁壬庚子居，戊癸何方发，壬子是真途
      const ziHourStemIndices = [
        0, // 甲 -> 甲 (0)
        2, // 乙 -> 丙 (2)
        4, // 丙 -> 戊 (4)
        6, // 丁 -> 庚 (6)
        8, // 戊 -> 壬 (8)
        0, // 己 -> 甲 (0)
        2, // 庚 -> 丙 (2)
        4, // 辛 -> 戊 (4)
        6, // 壬 -> 庚 (6)
        8  // 癸 -> 壬 (8)
      ];
      
      return ziHourStemIndices[stemIndex];
    };
    
    // 计算时柱地支
    // 精确的时辰划分：23-1点子时，1-3点丑时，依此类推
    const calculateBranchIndex = (hour) => {
      // 23点属于下一天的子时，但在八字计算中仍归当天
      // 修正：将23点视为第0个时辰，22点视为第11个时辰
      const normalizedHour = (hour + 1) % 24;
      return Math.floor(normalizedHour / 2) % 12;
    };
    
    // 获取子时的天干索引
    const ziHourStemIndex = getZiHourStemIndex(dayStem);
    
    // 计算当前时辰的地支索引
    const branchIndex = calculateBranchIndex(hour);
    
    // 计算当前时辰的天干索引（每个时辰对应一个天干，按顺序循环）
    // 注意：天干按顺序排列，每10个时辰循环一次
    const stemIndex = (ziHourStemIndex + branchIndex) % 10;
    
    return {
      heavenlyStem: this.heavenlyStems[stemIndex],
      earthlyBranch: this.earthlyBranches[branchIndex],
      full: this.heavenlyStems[stemIndex] + this.earthlyBranches[branchIndex],
      element: this.getStemElement(this.heavenlyStems[stemIndex])
    };
  }
  
  /**
   * 计算五行分析
   * @param {Object} yearPillar - 年柱
   * @param {Object} monthPillar - 月柱
   * @param {Object} dayPillar - 日柱
   * @param {Object} hourPillar - 时柱
   * @returns {Object} 五行分析结果
   */
  calculateFiveElements(yearPillar, monthPillar, dayPillar, hourPillar) {
    const elements = ['木', '火', '土', '金', '水'];
    const count = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
    
    // 统计各五行出现次数
    const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
    pillars.forEach(pillar => {
      count[pillar.element]++;
      // 地支也有五行属性，这里简化处理
      const branchElement = this.getBranchElement(pillar.earthlyBranch);
      count[branchElement] += 0.5; // 地支的五行力量较弱
    });
    
    // 找出强弱
    let strongest = elements[0];
    let weakest = elements[0];
    
    elements.forEach(element => {
      if (count[element] > count[strongest]) strongest = element;
      if (count[element] < count[weakest]) weakest = element;
    });
    
    return {
      count,
      strongest,
      weakest,
      balance: this.analyzeBalance(count)
    };
  }
  
  /**
   * 计算日元信息
   * @param {string} dayStem - 日天干
   * @returns {Object} 日元信息
   */
  calculateDayMaster(dayStem) {
    const element = this.getStemElement(dayStem);
    
    // 计算用神和忌神（简化版）
    // 实际应用中需要更复杂的分析
    let usefulGod, avoidGod;
    
    switch (element) {
      case '木':
        usefulGod = '火'; // 木生火
        avoidGod = '金'; // 金克木
        break;
      case '火':
        usefulGod = '土';
        avoidGod = '水';
        break;
      case '土':
        usefulGod = '金';
        avoidGod = '木';
        break;
      case '金':
        usefulGod = '水';
        avoidGod = '火';
        break;
      case '水':
        usefulGod = '木';
        avoidGod = '土';
        break;
      default:
        usefulGod = '火';
        avoidGod = '水';
    }
    
    return {
      stem: dayStem,
      element,
      usefulGod,
      avoidGod,
      characteristics: this.getDayMasterCharacteristics(dayStem)
    };
  }
  
  /**
   * 计算大运（精确版）
   * @param {Object} birthInfo - 出生信息
   * @param {Object} dayMaster - 日元信息
   * @returns {Object} 包含大运信息的完整对象
   */
  calculateLuckCycle(birthInfo, dayMaster) {
    const { year, month, day, hour, gender } = birthInfo;
    const cycles = [];
    
    // 计算起运年龄和方向
    const startInfo = this.calculateStartOfLuckCycle(year, month, day, gender);
    
    // 获取出生月柱作为基准
    const yearPillar = this.calculateYearPillar(year, month, day);
    const monthPillar = this.calculateMonthPillar(yearPillar.heavenlyStem, year, month, day);
    
    // 10年一大运，计算5步大运
    for (let i = 0; i < 5; i++) {
      const age = startInfo.startAge + i * 10;
      const cycleYear = startInfo.startYear + i * 10;
      
      // 计算大运天干地支（根据顺逆方向）
      const pillar = this.calculateLuckPillar(monthPillar, i, startInfo.isForward);
      
      // 分析大运影响
      const influence = this.analyzeCycleInfluence(
        pillar.heavenlyStem, 
        pillar.earthlyBranch, 
        dayMaster
      );
      
      cycles.push({
        period: `${Math.floor(age)}-${Math.floor(age) + 9}岁`,
        startYear: cycleYear,
        pillar: pillar,
        influence: influence,
        cycleIndex: i
      });
    }
    
    return {
      startInfo: startInfo,
      luckCycles: cycles,
      direction: startInfo.direction
    };
  }
  
  /**
   * 计算起运年龄和详细信息
   * 基于准确的起运规则：阳年生男、阴年生女顺行；阴年生男、阳年生女逆行
   * 顺行：从出生时间顺数到下一个节气
   * 逆行：从出生时间倒数到上一个节气
   */
  calculateStartOfLuckCycle(year, month, day, gender) {
    // 确定年干阴阳属性（甲丙戊庚壬为阳，乙丁己辛癸为阴）
    const yearStem = this.calculateYearPillar(year, month, day).heavenlyStem;
    const yearStemIndex = this.heavenlyStems.indexOf(yearStem);
    const isYearStemYang = yearStemIndex % 2 === 0; // 甲(0)、丙(2)、戊(4)、庚(6)、壬(8)为阳
    
    // 确定大运顺逆方向
    const isForward = (isYearStemYang && gender === 'male') || (!isYearStemYang && gender === 'female');
    
    // 创建出生日期对象
    const birthDate = new Date(year, month - 1, day);
    
    // 获取当年的节气信息
    const solarterms = this.getYearSolarterms(year);
    
    // 将节气转换为日期对象并排序
    const termDates = [];
    Object.keys(solarterms).forEach(term => {
      const termDate = new Date(year, solarterms[term].month - 1, solarterms[term].day);
      termDates.push({
        name: term,
        date: termDate
      });
    });
    
    // 按日期排序
    termDates.sort((a, b) => a.date - b.date);
    
    // 找到出生时间所在的节气区间
    let daysToTerm = 0;
    let referenceTerm = '';
    
    if (isForward) {
      // 顺行：顺数到下一个节气
      for (let i = 0; i < termDates.length; i++) {
        if (birthDate < termDates[i].date) {
          daysToTerm = this.calculateDaysDifference(
            year, month, day,
            year, termDates[i].date.getMonth() + 1, termDates[i].date.getDate()
          );
          referenceTerm = termDates[i].name;
          break;
        }
      }
      
      // 如果生日在最后一个节气之后，找下一年的第一个节气（立春）
      if (daysToTerm === 0) {
        const nextYearSpring = this.getStartOfSpring(year + 1);
        daysToTerm = this.calculateDaysDifference(
          year, month, day,
          year + 1, nextYearSpring.month, nextYearSpring.day
        );
        referenceTerm = '立春（下一年）';
      }
    } else {
      // 逆行：倒数到上一个节气
      for (let i = termDates.length - 1; i >= 0; i--) {
        if (birthDate > termDates[i].date) {
          daysToTerm = this.calculateDaysDifference(
            year, termDates[i].date.getMonth() + 1, termDates[i].date.getDate(),
            year, month, day
          );
          referenceTerm = termDates[i].name;
          break;
        }
      }
      
      // 如果生日在第一个节气之前，找前一年的最后一个节气（大寒）
      if (daysToTerm === 0) {
        const prevYearSolarterms = this.getYearSolarterms(year - 1);
        const prevYearLastTerm = new Date(year - 1, prevYearSolarterms.大寒.month - 1, prevYearSolarterms.大寒.day);
        daysToTerm = this.calculateDaysDifference(
          year - 1, prevYearSolarterms.大寒.month, prevYearSolarterms.大寒.day,
          year, month, day
        );
        referenceTerm = '大寒（上一年）';
      }
    }
    
    // 准确的起运规则：3天=1年，1天=4个月，1个时辰=10天
    const ageYears = Math.floor(daysToTerm / 3);
    const remainingDays = daysToTerm % 3;
    const ageMonths = Math.floor(remainingDays * 4); // 1天=4个月
    
    // 组合起运年龄（以年为单位的近似值）
    const startAge = ageYears + ageMonths / 12;
    const startYear = year + ageYears;
    
    return { 
      startAge, 
      startYear,
      years: ageYears,
      months: ageMonths,
      direction: isForward ? '顺行' : '逆行',
      isForward: isForward,
      daysToTerm: daysToTerm,
      referenceTerm: referenceTerm
    };
  }
  
  /**
   * 计算大运干支
   * 基于月柱，根据顺逆方向计算各步大运
   */
  calculateLuckPillar(basePillar, cycleIndex, isForward = true) {
    const baseStemIndex = this.heavenlyStems.indexOf(basePillar.heavenlyStem);
    const baseBranchIndex = this.earthlyBranches.indexOf(basePillar.earthlyBranch);
    
    // 计算大运天干地支
    let stemIndex, branchIndex;
    if (isForward) {
      // 顺行大运
      stemIndex = (baseStemIndex + cycleIndex) % 10;
      branchIndex = (baseBranchIndex + cycleIndex) % 12;
    } else {
      // 逆行大运
      stemIndex = (baseStemIndex - cycleIndex + 10) % 10;
      branchIndex = (baseBranchIndex - cycleIndex + 12) % 12;
    }
    
    return {
      heavenlyStem: this.heavenlyStems[stemIndex],
      earthlyBranch: this.earthlyBranches[branchIndex],
      full: this.heavenlyStems[stemIndex] + this.earthlyBranches[branchIndex]
    };
  }
  
  /**
   * 分析大运影响（改进版）
   */
  analyzeCycleInfluence(heavenlyStem, earthlyBranch, dayMaster) {
    const stemElement = this.getStemElement(heavenlyStem);
    const branchElement = this.getBranchElement(earthlyBranch);
    
    // 分析地支特殊关系
    const branchSpecialRelation = this.analyzeBranchRelation(dayMaster.stem, earthlyBranch);
    
    // 综合评估大运影响
    let influence = '一般';
    let score = 0;
    
    // 根据用神和忌神计算分数
    if (stemElement === dayMaster.usefulGod || branchElement === dayMaster.usefulGod) {
      score += 2;
    }
    if (stemElement === dayMaster.avoidGod || branchElement === dayMaster.avoidGod) {
      score -= 2;
    }
    
    // 特殊关系加分减分
    if (branchSpecialRelation === 'harmony') {
      score += 1;
    } else if (branchSpecialRelation === 'conflict') {
      score -= 1;
    }
    
    // 确定最终影响
    if (score >= 3) {
      influence = '大吉';
    } else if (score >= 1) {
      influence = '吉';
    } else if (score >= -1) {
      influence = '一般';
    } else if (score >= -3) {
      influence = '凶';
    } else {
      influence = '大凶';
    }
    
    return {
      level: influence,
      stemElement: stemElement,
      branchElement: branchElement,
      specialRelation: branchSpecialRelation,
      description: `${influence} - ${stemElement}${branchElement} ${branchSpecialRelation ? branchSpecialRelation : ''}`
    };
  }
  
  /**
   * 分析天干地支特殊关系
   */
  analyzeBranchRelation(dayStem, branch) {
    // 简单实现，实际应用中应包含更复杂的关系分析
    const dayElement = this.getStemElement(dayStem);
    const branchElement = this.getBranchElement(branch);
    
    // 五行相生关系
    const generatingCycle = ['木', '火', '土', '金', '水'];
    const dayElementIndex = generatingCycle.indexOf(dayElement);
    
    if (dayElementIndex !== -1) {
      // 生我为印
      if (branchElement === generatingCycle[(dayElementIndex - 1 + 5) % 5]) {
        return '印';
      }
      // 我生为食伤
      if (branchElement === generatingCycle[(dayElementIndex + 1) % 5]) {
        return '食伤';
      }
      // 同我为比劫
      if (branchElement === dayElement) {
        return '比劫';
      }
    }
    
    return null;
  }
  
  /**
   * 获取天干的五行属性
   */
  getStemElement(stem) {
    // 添加输入验证
    if (!stem || typeof stem !== 'string') {
      console.warn('无效的天干输入:', stem);
      return '未知';
    }
    
    const elements = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水'
    };
    
    const result = elements[stem];
    if (!result) {
      console.warn('未找到天干的五行属性:', stem);
    }
    
    return result || '未知';
  }
  
  /**
   * 获取地支的五行属性
   */
  getBranchElement(branch) {
    // 添加输入验证
    if (!branch || typeof branch !== 'string') {
      console.warn('无效的地支输入:', branch);
      return '未知';
    }
    
    const elements = {
      '子': '水', '丑': '土', '寅': '木', '卯': '木',
      '辰': '土', '巳': '火', '午': '火', '未': '土',
      '申': '金', '酉': '金', '戌': '土', '亥': '水'
    };
    
    const result = elements[branch];
    if (!result) {
      console.warn('未找到地支的五行属性:', branch);
    }
    
    return result || '未知';
  }
  
  /**
   * 获取立春日期
   */
  getStartOfSpring(year) {
    // 确保year是有效数字
    if (!Number.isInteger(year)) {
      throw new Error('年份必须是一个整数');
    }
    
    // 如果在预定义数据范围内，返回精确值
    if (this.startOfSpring[year]) {
      return this.startOfSpring[year];
    }
    
    // 对于超出预定义范围的年份，使用算法估计
    // 立春通常在2月3日至5日之间
    // 基于年份的奇偶性和闰年规则进行估算
    let estimatedDay = 4; // 默认2月4日
    
    // 简单估算逻辑
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      // 闰年时立春可能提前
      estimatedDay = 3;
    } else if (year > 2000) {
      // 21世纪后立春日期呈现一定规律
      if (year % 4 === 1) {
        estimatedDay = 3;
      }
    }
    
    return { month: 2, day: estimatedDay };
  }
  
  /**
   * 分析八字平衡
   */
  analyzeBalance(count) {
    const values = Object.values(count);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const diff = max - min;
    
    if (diff <= 1) return '中和';
    if (diff <= 2) return '较平衡';
    if (diff <= 3) return '偏枯';
    return '极不平衡';
  }
  
  /**
   * 获取日元特性
   */
  getDayMasterCharacteristics(stem) {
    // 获取日元特性描述
    const characteristics = {
      '甲': '阳木，具有积极、向上、创新的特性，象征参天大树。',
      '乙': '阴木，具有柔韧、适应性强、温和的特性，象征花草。',
      '丙': '阳火，热情、活跃、外向，象征太阳。',
      '丁': '阴火，温和、细腻、内敛，象征灯火。',
      '戊': '阳土，稳重、诚信、包容，象征大地。',
      '己': '阴土，细腻、保守、务实，象征田园。',
      '庚': '阳金，刚健、果断、坚韧，象征刀剑。',
      '辛': '阴金，精致、敏感、锐利，象征珠宝。',
      '壬': '阳水，奔放、流动、聪明，象征大江大河。',
      '癸': '阴水，温柔、智慧、内敛，象征雨露。'
    };
    return characteristics[stem] || '未知日元特性';
  }
  
  /**
   * 获取某一年的所有节气日期
   */
  getYearSolarterms(year) {
    const result = {};
    
    // 基础节气日期（简化计算，实际应用中应使用精确数据）
    const baseSolarterms = {
      '立春': { month: 2, avgDay: 4 },
      '雨水': { month: 2, avgDay: 19 },
      '惊蛰': { month: 3, avgDay: 6 },
      '春分': { month: 3, avgDay: 21 },
      '清明': { month: 4, avgDay: 5 },
      '谷雨': { month: 4, avgDay: 20 },
      '立夏': { month: 5, avgDay: 6 },
      '小满': { month: 5, avgDay: 21 },
      '芒种': { month: 6, avgDay: 6 },
      '夏至': { month: 6, avgDay: 21 },
      '小暑': { month: 7, avgDay: 7 },
      '大暑': { month: 7, avgDay: 23 },
      '立秋': { month: 8, avgDay: 8 },
      '处暑': { month: 8, avgDay: 23 },
      '白露': { month: 9, avgDay: 8 },
      '秋分': { month: 9, avgDay: 23 },
      '寒露': { month: 10, avgDay: 8 },
      '霜降': { month: 10, avgDay: 23 },
      '立冬': { month: 11, avgDay: 7 },
      '小雪': { month: 11, avgDay: 22 },
      '大雪': { month: 12, avgDay: 7 },
      '冬至': { month: 12, avgDay: 22 },
      '小寒': { month: 1, avgDay: 6 },
      '大寒': { month: 1, avgDay: 20 }
    };
    
    // 计算闰年调整
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const leapAdjustment = isLeapYear ? 1 : 0;
    
    // 计算每个节气的日期
    this.solarterms.forEach(term => {
      // 对于立春，使用已有的精确数据
      if (term === '立春' && this.startOfSpring[year]) {
        result[term] = this.startOfSpring[year];
      } else {
        // 对于其他节气，使用估算值
        const base = baseSolarterms[term];
        let adjustedDay = base.avgDay;
        
        // 对特定节气添加年份相关的调整
        if (term === '春分' || term === '秋分') {
          // 春分和秋分需要考虑闰年调整
          adjustedDay += leapAdjustment;
        }
        
        result[term] = {
          month: base.month,
          day: Math.round(adjustedDay)
        };
      }
    });
    
    return result;
  }
  
  /**
   * 获取特定节气的日期
   */
  getSolartermDate(year, termName) {
    // 验证节气名称
    if (!this.solarterms.includes(termName)) {
      throw new Error(`无效的节气名称: ${termName}`);
    }
    
    // 对于立春，使用已有的精确数据
    if (termName === '立春' && this.startOfSpring[year]) {
      return this.startOfSpring[year];
    }
    
    // 对于其他节气，获取全年节气并返回对应节气
    const yearSolarterms = this.getYearSolarterms(year);
    return yearSolarterms[termName];
  }
  
  /**
   * 根据日期确定当前处于哪个节气区间
   */
  getCurrentSolartermRange(year, month, day) {
    const birthDate = new Date(year, month - 1, day);
    const solarterms = this.getYearSolarterms(year);
    const nextYearSolarterms = this.getYearSolarterms(year + 1);
    
    // 组合当前年和下一年的节气，以处理年末和年初的情况
    const combinedSolarterms = {};
    
    // 复制当前年的节气
    Object.keys(solarterms).forEach(term => {
      combinedSolarterms[term] = { ...solarterms[term], year: year };
    });
    
    // 添加下一年的立春
    combinedSolarterms['立春_next'] = { 
      ...nextYearSolarterms['立春'], 
      year: year + 1,
      originalName: '立春'
    };
    
    // 排序节气
    const sortedTerms = [];
    this.solarterms.forEach(term => {
      if (combinedSolarterms[term]) {
        sortedTerms.push({
          name: term,
          date: new Date(combinedSolarterms[term].year, 
                        combinedSolarterms[term].month - 1, 
                        combinedSolarterms[term].day)
        });
      }
    });
    
    // 添加下一年的立春
    sortedTerms.push({
      name: '立春_next',
      date: new Date(combinedSolarterms['立春_next'].year, 
                    combinedSolarterms['立春_next'].month - 1, 
                    combinedSolarterms['立春_next'].day)
    });
    
    // 按日期排序
    sortedTerms.sort((a, b) => a.date - b.date);
    
    // 查找当前日期所在的区间
    for (let i = 0; i < sortedTerms.length - 1; i++) {
      if (birthDate >= sortedTerms[i].date && birthDate < sortedTerms[i + 1].date) {
        return {
          current: sortedTerms[i].name === '立春_next' ? '立春' : sortedTerms[i].name,
          next: sortedTerms[i + 1].name === '立春_next' ? '立春' : sortedTerms[i + 1].name,
          startDate: sortedTerms[i].date,
          endDate: sortedTerms[i + 1].date
        };
      }
    }
    
    // 默认返回立春到雨水
    return {
      current: '立春',
      next: '雨水',
      startDate: new Date(year, 1, 4),
      endDate: new Date(year, 1, 19)
    };
  }
}

// 导出单例实例
export default new BaziCalculator();