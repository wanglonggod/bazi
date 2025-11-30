// AI服务模块 - 模拟八字解析和命运预测功能

class AIService {
  constructor() {
    // 初始化AI服务配置
    this.config = {
      // 模拟AI参数设置
      temperature: 0.7,
      maxTokens: 1000
    };
  }

  /**
   * 获取日元五行性格特征
   */
  getDayMasterCharacteristics(dayMaster) {
    const characteristics = {
      '金': ['果断', '正义', '理性', '坚强'],
      '木': ['仁慈', '正直', '成长', '创新'],
      '水': ['智慧', '灵活', '适应', '沟通'],
      '火': ['热情', '活力', '领导', '创造'],
      '土': ['稳重', '包容', '务实', '可靠']
    };
    
    return characteristics[dayMaster.element] || ['平衡', '适应'];
  }

  /**
   * 分析八字并生成预测结果
   * @param {Object} baziData - 八字数据对象
   * @returns {Object} 分析结果
   */
  async analyzeBazi(baziData) {
    console.log('AI服务开始分析八字:', baziData.fullBazi);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 获取历史人物相似度分析
    const historicalFigureAnalysis = this.analyzeHistoricalFigure(baziData.fullBazi, baziData.dayMaster);
    
    // 获取音乐推荐
    const musicRecommendation = this.analyzeMusicRecommendation(baziData.dayMaster);
    
    // 生成综合分析结果
    const analysis = {
      overview: this.generateOverview(baziData),
      career: this.analyzeCareer(baziData),
      wealth: this.analyzeWealth(baziData),
      relationships: this.analyzeRelationships(baziData),
      health: this.analyzeHealth(baziData),
      fiveElements: this.analyzeFiveElements(baziData.fiveElements),
      historicalFigure: historicalFigureAnalysis,
      musicRecommendation: musicRecommendation,
      suggestions: this.generateSuggestions(baziData)
    };
    
    console.log('AI分析完成');
    return analysis;
  }

  /**
   * 生成整体概述
   */
  generateOverview(baziData) {
    const { dayMaster, fiveElements } = baziData;
    const balance = fiveElements.balance;
    const usefulGod = dayMaster.usefulGod;
    const avoidGod = dayMaster.avoidGod;
    
    let overview = `${baziData.fullBazi}八字，日元为${dayMaster.stem}${dayMaster.branch}，五行属性为${dayMaster.element}。`;
    
    // 根据五行平衡情况分析
    if (balance === '中和') {
      overview += `八字中和，五行均衡，一生较为平顺，无大起大落。`;
    } else if (balance === '偏强') {
      overview += `八字偏强，${dayMaster.element}气过旺，需要${usefulGod}来泄耗平衡。`;
    } else if (balance === '偏弱') {
      overview += `八字偏弱，${dayMaster.element}气不足，需要${usefulGod}来扶持生助。`;
    }
    
    overview += `用神为${usefulGod}，忌神为${avoidGod}。`;
    return overview;
  }

  /**
   * 分析事业
   */
  analyzeCareer(baziData) {
    const { dayMaster, fiveElements, luckCycle } = baziData;
    const careerAnalysis = [];
    
    // 根据日元五行分析适合的职业方向
    switch(dayMaster.element) {
      case '木':
        careerAnalysis.push('您日元属木，性格正直、积极向上，适合从事教育、文化、艺术、创新等行业。');
        break;
      case '火':
        careerAnalysis.push('您日元属火，热情开朗、有领导力，适合从政、销售、表演、公关等需要与人打交道的工作。');
        break;
      case '土':
        careerAnalysis.push('您日元属土，稳重踏实、有耐心，适合从事房地产、农业、金融、管理等稳定型工作。');
        break;
      case '金':
        careerAnalysis.push('您日元属金，思维缜密、执行力强，适合从事技术、法律、金融、精密仪器等行业。');
        break;
      case '水':
        careerAnalysis.push('您日元属水，聪明灵活、应变能力强，适合从事设计、策划、旅游、信息科技等行业。');
        break;
    }
    
    // 根据五行强弱分析职业发展
    const strongestElement = fiveElements.strongest;
    if (strongestElement === dayMaster.usefulGod) {
      careerAnalysis.push(`八字中${strongestElement}元素旺盛，对您的事业发展非常有利，可以多往${this.getElementDirection(strongestElement)}方向发展。`);
    }
    
    // 根据当前大运分析
    // 找到当前大运（根据当前年龄）
    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - luckCycle.startInfo.startYear + luckCycle.startInfo.startAge;
    
    // 计算当前大运序号
    const yearsSinceStart = currentAge - luckCycle.startInfo.startAge;
    const currentCycleIndex = Math.floor(yearsSinceStart / 10);
    
    // 确保不会超出数组范围
    const safeIndex = Math.min(currentCycleIndex, luckCycle.luckCycles.length - 1);
    const currentLuck = luckCycle.luckCycles[safeIndex] || luckCycle.luckCycles[0];
    
    if (currentLuck.influence === '吉') {
      careerAnalysis.push(`目前正行${currentLuck.period}，大运为${currentLuck.pillar.full}，事业运势较好，适合积极进取，可以把握机会谋求发展。`);
    } else if (currentLuck.influence === '凶') {
      careerAnalysis.push(`目前正行${currentLuck.period}，大运为${currentLuck.pillar.full}，事业上可能会遇到一些挑战，建议保持稳健，积累经验。`);
    } else {
      careerAnalysis.push(`目前正行${currentLuck.period}，大运为${currentLuck.pillar.full}，事业发展较为平稳，可以稳步前行。`);
    }
    
    return careerAnalysis.join(' ');
  }

  /**
   * 分析财运
   */
  analyzeWealth(baziData) {
    const { dayMaster, fiveElements } = baziData;
    const wealthAnalysis = [];
    
    // 根据日元五行分析财运特点
    switch(dayMaster.element) {
      case '木':
        wealthAnalysis.push('您日元属木，财运来源多与创新和知识相关，适合通过专业技能和创意获取财富。');
        break;
      case '火':
        wealthAnalysis.push('您日元属火，财运较好但波动较大，适合多元化投资，避免将鸡蛋放在一个篮子里。');
        break;
      case '土':
        wealthAnalysis.push('您日元属土，财运稳定，适合长期稳健投资和储蓄，不宜过度冒险。');
        break;
      case '金':
        wealthAnalysis.push('您日元属金，赚钱能力强，但也容易大手大脚，需要注意理财规划。');
        break;
      case '水':
        wealthAnalysis.push('您日元属水，财运灵活多变，适合把握市场机会，但需注意风险控制。');
        break;
    }
    
    // 根据五行分析
    if (fiveElements.count['土'] > 2) {
      wealthAnalysis.push('八字中土元素较多，财运基础稳固，容易积累财富。');
    }
    
    if (this.isElementStrong(fiveElements, dayMaster.usefulGod)) {
      wealthAnalysis.push(`八字中${dayMaster.usefulGod}元素较强，有利于财富的获取和积累。`);
    }
    
    return wealthAnalysis.join(' ');
  }

  /**
   * 分析感情和人际关系
   */
  analyzeRelationships(baziData) {
    const { dayMaster } = baziData;
    const relationshipAnalysis = [];
    
    // 根据日元分析性格特点对感情的影响
    relationshipAnalysis.push(`您的日元为${dayMaster.stem}，${dayMaster.characteristics}。`);
    
    // 根据五行分析适合的伴侣类型
    const compatibleElements = this.getCompatibleElements(dayMaster.element);
    relationshipAnalysis.push(`在感情方面，您与五行属${compatibleElements.join('、')}的人比较合得来。`);
    
    // 给出一些建议
    switch(dayMaster.element) {
      case '木':
        relationshipAnalysis.push('在感情中，您需要学会更加包容和耐心，避免过于直接和固执。');
        break;
      case '火':
        relationshipAnalysis.push('在感情中，您需要注意控制情绪，避免过于冲动和急躁，多站在对方角度考虑问题。');
        break;
      case '土':
        relationshipAnalysis.push('在感情中，您的稳重是优点，但也可以适当增加一些浪漫和惊喜。');
        break;
      case '金':
        relationshipAnalysis.push('在感情中，您需要学会表达情感，不要过于理性和严肃，多一些温柔和体贴。');
        break;
      case '水':
        relationshipAnalysis.push('在感情中，您需要保持专注和稳定，避免变化无常，给对方足够的安全感。');
        break;
    }
    
    return relationshipAnalysis.join(' ');
  }

  /**
   * 分析健康
   */
  analyzeHealth(baziData) {
    const { dayMaster, fiveElements } = baziData;
    const healthAnalysis = [];
    
    // 根据日元五行分析易患疾病
    const healthNotice = this.getHealthNoticeByElement(dayMaster.element);
    healthAnalysis.push(`健康方面，您需要特别注意${healthNotice}的保养。`);
    
    // 根据五行平衡分析
    if (fiveElements.balance !== '中和') {
      healthAnalysis.push('由于八字五行不太平衡，建议通过饮食调理和生活习惯的改善来维持身体的阴阳平衡。');
    }
    
    // 给出具体的养生建议
    healthAnalysis.push(this.getHealthSuggestions(dayMaster.element));
    
    return healthAnalysis.join(' ');
  }

  /**
   * 分析五行
   */
  analyzeFiveElements(fiveElements) {
    let analysis = [];
    
    // 分析各五行的强弱
    Object.entries(fiveElements.count).forEach(([element, count]) => {
      let level = '';
      if (count > 3) level = '旺盛';
      else if (count > 1) level = '适中';
      else level = '偏弱';
      
      analysis.push(`${element}元素${level}`);
    });
    
    analysis.push(`整体以${fiveElements.strongest}元素为主导，${fiveElements.weakest}元素相对不足。`);
    
    // 分析五行平衡对命运的影响
    if (fiveElements.balance === '中和') {
      analysis.push('五行较为平衡，一生运势平稳，少有大起大落。');
    } else if (fiveElements.balance === '偏强') {
      analysis.push('五行偏强，性格较为强势，运势起伏较大，但往往能成就一番事业。');
    } else {
      analysis.push('五行偏弱，需要注意身体保养，运势相对平稳但可能缺乏突破。');
    }
    
    return analysis.join('，');
  }

  /**
   * 分析历史人物相似度
   */
  analyzeHistoricalFigure(bazi, dayMaster) {
    const figures = [
      {
        name: '诸葛亮',
        element: '水',
        characteristics: ['智慧', '谋略', '忠诚'],
        description: '三国时期蜀汉丞相，以智慧和谋略著称'
      },
      {
        name: '李白',
        element: '木',
        characteristics: ['浪漫', '才华', '自由'],
        description: '唐代著名诗人，被誉为"诗仙"'
      },
      {
        name: '武则天',
        element: '火',
        characteristics: ['权力', '果断', '魅力'],
        description: '中国历史上唯一的女皇帝'
      },
      {
        name: '王阳明',
        element: '土',
        characteristics: ['稳重', '思考', '实践'],
        description: '明代著名哲学家，心学大师'
      },
      {
        name: '秦始皇',
        element: '金',
        characteristics: ['霸气', '统一', '改革'],
        description: '中国第一个皇帝，统一六国'
      }
    ];

    // 获取日元的性格特征
    const dayMasterCharacteristics = this.getDayMasterCharacteristics(dayMaster);

    // 根据日元五行选择最相似的历史人物
    let selectedFigure = figures[0];
    let maxScore = 0;

    figures.forEach(figure => {
      let score = 0;
      
      // 五行匹配
      if (figure.element === dayMaster.element) {
        score += 3;
      }
      
      // 性格特征匹配
      figure.characteristics.forEach(char => {
        if (dayMasterCharacteristics.includes(char)) {
          score += 1;
        }
      });
      
      if (score > maxScore) {
        maxScore = score;
        selectedFigure = figure;
      }
    });

    return `根据您的八字分析，您与${selectedFigure.name}最为相似。${selectedFigure.name}是${selectedFigure.description}，其性格特征为${selectedFigure.characteristics.join('、')}。您的日元五行属性为${dayMaster.element}，与${selectedFigure.name}的${selectedFigure.element}属性相呼应，这表明您可能具有类似的性格特质和人生轨迹。`;
  }

  /**
   * 音乐推荐
   */
  analyzeMusicRecommendation(dayMaster) {
    const musicTypes = {
      '金': {
        genres: ['古典音乐', '交响乐', '金属乐'],
        instruments: ['钢琴', '小提琴', '铜管乐器'],
        description: '金属性的人适合结构严谨、气势磅礴的音乐，能够激发内心的力量和决断力。'
      },
      '木': {
        genres: ['民谣', '轻音乐', '自然音乐'],
        instruments: ['吉他', '长笛', '竖琴'],
        description: '木属性的人适合清新自然、富有生命力的音乐，能够带来平和与成长的力量。'
      },
      '水': {
        genres: ['爵士乐', '新世纪音乐', '氛围音乐'],
        instruments: ['萨克斯', '钢琴', '电子合成器'],
        description: '水属性的人适合流畅灵动、富有变化的音乐，能够激发智慧和直觉。'
      },
      '火': {
        genres: ['摇滚乐', '流行音乐', '拉丁音乐'],
        instruments: ['电吉他', '鼓', '小号'],
        description: '火属性的人适合热情奔放、充满活力的音乐，能够点燃激情和创造力。'
      },
      '土': {
        genres: ['世界音乐', '民族音乐', '冥想音乐'],
        instruments: ['古筝', '二胡', '打击乐器'],
        description: '土属性的人适合厚重沉稳、富有包容性的音乐，能够带来安全感和稳定性。'
      }
    };

    const musicInfo = musicTypes[dayMaster.element] || musicTypes['水'];
    
    return `根据您的日元五行属性${dayMaster.element}，推荐您聆听${musicInfo.genres.join('、')}等类型的音乐。这些音乐通常使用${musicInfo.instruments.join('、')}等乐器演奏。${musicInfo.description}建议您在需要放松、思考或激发灵感时，选择这些类型的音乐，能够更好地调和身心状态。`;
  }

  /**
   * 生成改善建议
   */
  generateSuggestions(baziData) {
    const { dayMaster, fiveElements } = baziData;
    const suggestions = [];
    
    // 基于日元和五行给出建议
    suggestions.push(`根据您的八字分析，建议您在日常生活中多接触${dayMaster.usefulGod}属性的事物，如颜色、方位、职业等。`);
    
    // 根据五行平衡给出饮食建议
    suggestions.push(this.getDietarySuggestions(fiveElements, dayMaster.element));
    
    // 根据日元给出性格改善建议
    suggestions.push(this.getPersonalitySuggestions(dayMaster.element));
    
    // 给出吉祥物或幸运数字建议
    suggestions.push(`您的幸运数字为${this.getLuckyNumbers(dayMaster.stem)}，吉祥物为${this.getLuckyAnimal(dayMaster.branch)}。`);
    
    return suggestions.join(' ');
  }

  // 辅助方法
  getElementDirection(element) {
    const directions = {
      '木': '东方或东南方',
      '火': '南方',
      '土': '中央或西南方',
      '金': '西方或西北方',
      '水': '北方'
    };
    return directions[element] || '';
  }

  isElementStrong(fiveElements, element) {
    return fiveElements.count[element] > 2;
  }

  getCompatibleElements(element) {
    const compatibility = {
      '木': ['水', '火'],
      '火': ['木', '土'],
      '土': ['火', '金'],
      '金': ['土', '水'],
      '水': ['金', '木']
    };
    return compatibility[element] || [];
  }

  getHealthNoticeByElement(element) {
    const notices = {
      '木': '肝胆和神经系统',
      '火': '心脏和血液循环系统',
      '土': '脾胃和消化系统',
      '金': '肺和呼吸系统',
      '水': '肾脏和泌尿系统'
    };
    return notices[element] || '各方面';
  }

  getHealthSuggestions(element) {
    const suggestions = {
      '木': '建议保持心情舒畅，避免愤怒和压抑，多进行户外活动，如散步、太极等。',
      '火': '建议控制情绪，避免急躁和激动，保持充足的睡眠，多吃清热降火的食物。',
      '土': '建议饮食规律，避免暴饮暴食，保持适度运动，避免过度劳累。',
      '金': '建议保持空气流通，避免吸烟和空气污染，多进行深呼吸练习。',
      '水': '建议保持规律作息，避免熬夜，注意腰部保暖，适当进行有氧运动。'
    };
    return suggestions[element] || '';
  }

  getDietarySuggestions(fiveElements, dayMasterElement) {
    // 根据五行和日元给出饮食建议
    if (fiveElements.balance === '偏强') {
      return `由于八字偏强，建议多食用属${this.getCounterElement(dayMasterElement)}的食物来平衡。`;
    } else if (fiveElements.balance === '偏弱') {
      return `由于八字偏弱，建议多食用属${dayMasterElement}的食物来增强。`;
    } else {
      return '建议保持饮食多样化，营养均衡即可。';
    }
  }

  getCounterElement(element) {
    const counters = {
      '木': '金',
      '火': '水',
      '土': '木',
      '金': '火',
      '水': '土'
    };
    return counters[element] || '';
  }

  getPersonalitySuggestions(element) {
    const suggestions = {
      '木': '建议培养耐心和包容性，避免过于固执己见。',
      '火': '建议学会控制情绪，保持冷静和理性。',
      '土': '建议增加灵活性和创新思维，避免过于保守。',
      '金': '建议培养同理心和表达能力，避免过于严肃。',
      '水': '建议保持专注和稳定，避免变化无常。'
    };
    return suggestions[element] || '';
  }

  getLuckyNumbers(stem) {
    const numbers = {
      '甲': '1、6',
      '乙': '1、6',
      '丙': '2、7',
      '丁': '2、7',
      '戊': '5、10',
      '己': '5、10',
      '庚': '4、9',
      '辛': '4、9',
      '壬': '1、6',
      '癸': '1、6'
    };
    return numbers[stem] || '无';
  }

  getLuckyAnimal(branch) {
    const animals = {
      '子': '鼠',
      '丑': '牛',
      '寅': '虎',
      '卯': '兔',
      '辰': '龙',
      '巳': '蛇',
      '午': '马',
      '未': '羊',
      '申': '猴',
      '酉': '鸡',
      '戌': '狗',
      '亥': '猪'
    };
    return animals[branch] || '无';
  }
}

// 导出类
export default AIService;