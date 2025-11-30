import db from './database.js';

export const recordService = {
  // 保存测算记录
  async saveRecord(userId, baziData, analysis) {
    const record = {
      id: Date.now().toString(),
      userId,
      baziData: {
        fullBazi: baziData.fullBazi,
        dayMaster: baziData.dayMaster,
        year: baziData.year,
        month: baziData.month,
        day: baziData.day,
        hour: baziData.hour,
        gender: baziData.gender,
        birthDate: baziData.birthDate,
        lunarDate: baziData.lunarDate,
        solarTerms: baziData.solarTerms
      },
      analysis: {
        overview: analysis.overview,
        dayMaster: analysis.dayMaster,
        career: analysis.career,
        wealth: analysis.wealth,
        relationships: analysis.relationships,
        health: analysis.health,
        fiveElements: analysis.fiveElements,
        luckCycle: analysis.luckCycle,
        historicalFigure: analysis.historicalFigure,
        musicRecommendation: analysis.musicRecommendation,
        suggestions: analysis.suggestions
      },
      createdAt: new Date().toISOString()
    };

    db.data.records.push(record);
    await db.write();
    return record;
  },

  // 获取用户的测算记录
  async getUserRecords(userId, limit = 50) {
    const records = db.data.records
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
    
    return records;
  },

  // 获取单条记录详情
  async getRecordById(recordId, userId) {
    const record = db.data.records.find(r => r.id === recordId && r.userId === userId);
    return record;
  },

  // 删除记录
  async deleteRecord(recordId, userId) {
    const index = db.data.records.findIndex(r => r.id === recordId && r.userId === userId);
    if (index === -1) {
      throw new Error('记录不存在');
    }

    db.data.records.splice(index, 1);
    await db.write();
    return true;
  }
};