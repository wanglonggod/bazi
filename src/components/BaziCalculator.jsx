import { useState, useRef } from 'react'
import baziCalculator from '../utils/baziCalculator'
import AIService from '../services/aiService'
import { recordService } from '../services/recordService.js'
import { colors } from '../utils/theme'
import { animateOnce, staggerAnimation } from '../utils/animations'
import './BaziCalculator.css'

function BaziCalculator({ currentUser }) {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    gender: 'male',
    timezone: 'Asia/Shanghai'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [savingRecord, setSavingRecord] = useState(false)
  const formRef = useRef(null)
  const resultRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value : Number(value) || value
    }))
  }

  const handleCalculate = async (e) => {
    e.preventDefault()
    
    // 表单提交动画
    if (formRef.current) {
      animateOnce(formRef.current, 'animation-scale-in')
    }
    
    setLoading(true)
    
    try {
      // 使用专业的八字计算工具类
      const baziData = baziCalculator.calculateBazi(formData)
      
      // 使用真实的AI服务进行分析
      const aiService = new AIService()
      const analysis = await aiService.analyzeBazi(baziData)
      
      setResult({
        bazi: baziData,
        analysis: analysis
      })
      
      // 结果显示动画
      if (resultRef.current) {
        animateOnce(resultRef.current, 'animation-slide-in-up')
        
        // 为结果中的各个部分添加交错动画
        setTimeout(() => {
          const resultItems = resultRef.current.querySelectorAll('.analysis-section, .bazi-display, .day-master-info')
          staggerAnimation(resultItems, 'animation-fade-in', 100)
        }, 100)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('计算失败:', error)
      setLoading(false)
    }
  }
  
  // 保存测算记录
  const handleSaveRecord = async () => {
    if (!currentUser || !result) return
    
    try {
      setSavingRecord(true)
      await recordService.saveRecord({
        baziData: result.bazi,
        analysis: result.analysis
      })
      alert('测算记录已保存！')
    } catch (error) {
      console.error('保存记录失败:', error)
      alert('保存记录失败，请重试')
    } finally {
      setSavingRecord(false)
    }
  }
  
  // 重置按钮处理
  const handleReset = () => {
    setResult(null)
    // 重置表单到初始状态
    setFormData({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      gender: 'male',
      timezone: 'Asia/Shanghai'
    })
    
    // 聚焦到年份输入框
    setTimeout(() => {
      const yearInput = document.getElementById('year')
      if (yearInput) {
        yearInput.focus()
      }
    }, 100)
  }

  // 八字计算现在由专业工具类处理

  // 生成模拟的AI分析结果
  const generateMockAnalysis = (bazi) => {
    // 安全获取大运数据
    const luckCycles = bazi.luckCycle?.luckCycles || []
    
    // 找到当前大运（根据当前年龄）
    let currentCycle = null;
    if (bazi.luckCycle?.startInfo && luckCycles.length > 0) {
      const currentYear = new Date().getFullYear();
      const birthYear = parseInt(bazi.fullBazi.substring(0, 4)); // 从八字中提取年份
      const currentAge = currentYear - birthYear;
      
      // 计算当前大运序号
      const yearsSinceStart = currentAge - bazi.luckCycle.startInfo.startAge;
      const currentCycleIndex = Math.floor(yearsSinceStart / 10);
      
      // 确保不会超出数组范围
      const safeIndex = Math.min(currentCycleIndex, luckCycles.length - 1);
      currentCycle = luckCycles[safeIndex] || luckCycles[0];
    }
    
    const firstCycle = luckCycles.length > 0 ? luckCycles[0] : null
    
    return {
      overview: `${bazi.fullBazi}八字，日元为${bazi.dayMaster.stem}，五行属性为${bazi.dayMaster.element}。整体格局${bazi.fiveElements.balance}，用神为${bazi.dayMaster.usefulGod}，忌神为${bazi.dayMaster.avoidGod}。`,
      dayMaster: bazi.dayMaster.characteristics,
      career: `事业方面，您的八字${bazi.fiveElements.strongest}元素较旺，${bazi.dayMaster.element === '木' || bazi.dayMaster.element === '火' ? '适合创新、开拓类工作' : '适合稳定、管理类工作'}。${firstCycle && firstCycle.influence === '吉' ? '青年时期' : '中年时期'}运势较好，会有不错的发展。`,
      wealth: `财运方面，您的八字显示${bazi.fiveElements.count['土'] > 2 ? '财星较旺' : '财运稳定'}，通过${bazi.dayMaster.element === '金' || bazi.dayMaster.element === '土' ? '稳健投资' : '努力工作'}会有不错的收入。`,
      relationships: `感情方面，${bazi.dayMaster.characteristics.split('，')[1]}，适合找性格${bazi.dayMaster.element === '火' || bazi.dayMaster.element === '水' ? '互补' : '相似'}的伴侣。`,
      health: `健康方面，需要注意${getHealthNotice(bazi.dayMaster.element)}方面的保养，保持良好的生活习惯。`,
      fiveElements: generateFiveElementsAnalysis(bazi.fiveElements),
      luckCycle: currentCycle ? `目前正行${currentCycle.period}，大运为${currentCycle.pillar.full}，整体运势${currentCycle.influence}。` : '大运信息暂时无法获取。'
    }
  }

  // 根据五行属性获取健康注意事项
  const getHealthNotice = (element) => {
    const notices = {
      '木': '肝胆和神经系统',
      '火': '心脏和血液循环',
      '土': '脾胃和消化系统',
      '金': '肺和呼吸系统',
      '水': '肾脏和生殖系统'
    }
    return notices[element] || '各方面'
  }
  
  // 生成五行分析
  const generateFiveElementsAnalysis = (fiveElements) => {
    let analysis = '';
    Object.entries(fiveElements.count).forEach(([element, count]) => {
      const level = count > 3 ? '旺盛' : count > 1 ? '适中' : '偏弱';
      analysis += `${element}元素${level}，`;
    });
    analysis += `整体以${fiveElements.strongest}元素为主导，${fiveElements.weakest}元素相对不足。`;
    return analysis;
  }

  return (
    <div className="bazi-calculator">
      <div className="calculator-container hover-glow">
        <h2>输入出生信息</h2>
        <form onSubmit={handleCalculate} ref={formRef}>
          <div className="form-row">
            <div className="form-group">
              <label>出生年份</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div className="form-group">
              <label>出生月份</label>
              <input
                type="number"
                name="month"
                value={formData.month}
                onChange={handleChange}
                min="1"
                max="12"
                required
              />
            </div>
            <div className="form-group">
              <label>出生日期</label>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                min="1"
                max="31"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>出生小时</label>
              <input
                type="number"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                min="0"
                max="23"
                required
              />
            </div>
            <div className="form-group">
              <label>出生分钟</label>
              <input
                type="number"
                name="minute"
                value={formData.minute}
                onChange={handleChange}
                min="0"
                max="59"
                required
              />
            </div>
          </div>
          
          <div className="form-group gender-group">
            <label>性别</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                男
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                女
              </label>
            </div>
          </div>
          
          <button type="submit" className="calculate-btn hover-scale" disabled={loading}>
            {loading ? (
              <>
                <span className="animation-loading"></span>
                <span>正在分析...</span>
              </>
            ) : '开始算命'}
          </button>
        </form>
      </div>
      
      {result && (
        <div className="result-container" ref={resultRef}>
          <div className="bazi-header">
            <h3>您的八字</h3>
            <div className="zodiac-info">
              <span className="zodiac-label">生肖：</span>
              <span className="zodiac-value">{result.bazi.zodiac}</span>
            </div>
          </div>
          
          <div className="bazi-display">
            <div className="bazi-item">
              <span className="bazi-label">年柱</span>
              <span className="bazi-value" style={{color: colors.elements[result.bazi.yearPillar.element]}}>
                {result.bazi.yearPillar.full}
              </span>
              <span className="element-tag">{result.bazi.yearPillar.element}</span>
            </div>
            <div className="bazi-item">
              <span className="bazi-label">月柱</span>
              <span className="bazi-value" style={{color: colors.elements[result.bazi.monthPillar.element]}}>
                {result.bazi.monthPillar.full}
              </span>
              <span className="element-tag">{result.bazi.monthPillar.element}</span>
            </div>
            <div className="bazi-item">
              <span className="bazi-label">日柱</span>
              <span className="bazi-value" style={{color: colors.elements[result.bazi.dayPillar.element]}}>
                {result.bazi.dayPillar.full}
              </span>
              <span className="element-tag">{result.bazi.dayPillar.element}</span>
            </div>
            <div className="bazi-item">
              <span className="bazi-label">时柱</span>
              <span className="bazi-value" style={{color: colors.elements[result.bazi.hourPillar.element]}}>
                {result.bazi.hourPillar.full}
              </span>
              <span className="element-tag">{result.bazi.hourPillar.element}</span>
            </div>
          </div>
          
          <div className="day-master-info">
            <h4>日元信息</h4>
            <p><strong>日元天干：</strong>{result.bazi.dayMaster.stem}</p>
            <p><strong>五行属性：</strong>{result.bazi.dayMaster.element}</p>
            <p><strong>性格特点：</strong>{result.bazi.dayMaster.characteristics}</p>
            <p><strong>用神：</strong>{result.bazi.dayMaster.usefulGod} | <strong>忌神：</strong>{result.bazi.dayMaster.avoidGod}</p>
          </div>
          
          <h3>AI分析结果</h3>
          <div className="analysis-result">
            <div className="analysis-section hover-lift">
              <h4>整体概述</h4>
              <p>{result.analysis.overview}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>五行分析</h4>
              <p>{result.analysis.fiveElements}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>事业分析</h4>
              <p>{result.analysis.career}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>财运分析</h4>
              <p>{result.analysis.wealth}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>感情分析</h4>
              <p>{result.analysis.relationships}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>健康分析</h4>
              <p>{result.analysis.health}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>历史人物相似度</h4>
              <p>{result.analysis.historicalFigure}</p>
            </div>
            <div className="analysis-section hover-lift">
              <h4>音乐推荐</h4>
              <p>{result.analysis.musicRecommendation}</p>
            </div>
          </div>
          
          <div className="result-actions">
            {currentUser && (
              <button 
                type="button" 
                className="save-record-btn hover-scale"
                onClick={handleSaveRecord}
                disabled={savingRecord}
              >
                {savingRecord ? '保存中...' : '保存记录'}
              </button>
            )}
            <button 
              type="button" 
              className="reset-button hover-scale"
              onClick={handleReset}
            >
              重新测算
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BaziCalculator
