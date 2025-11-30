import React, { useState, useEffect } from 'react';
import { recordService } from '../services/recordService.js';
import './RecordsList.css';

const RecordsList = ({ isOpen, onClose }) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadRecords();
    }
  }, [isOpen]);

  const loadRecords = async () => {
    try {
      setIsLoading(true);
      setError('');
      const userRecords = await recordService.getUserRecords();
      setRecords(userRecords);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (recordId) => {
    if (!window.confirm('确定要删除这条记录吗？')) {
      return;
    }

    try {
      await recordService.deleteRecord(recordId);
      loadRecords(); // 重新加载记录
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const formatBazi = (baziData) => {
    return `${baziData.year}年${baziData.month}月${baziData.day}日 ${baziData.hour}时`;
  };

  if (!isOpen) return null;

  return (
    <div className="records-modal-overlay" onClick={onClose}>
      <div className="records-modal" onClick={(e) => e.stopPropagation()}>
        <div className="records-modal-header">
          <h2>我的测算记录</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="records-content">
          {isLoading && (
            <div className="loading-message">正在加载记录...</div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}

          {!isLoading && !error && records.length === 0 && (
            <div className="empty-message">
              <p>您还没有任何测算记录</p>
              <p>快去进行一次八字测算吧！</p>
            </div>
          )}

          {!isLoading && !error && records.length > 0 && (
            <div className="records-list">
              {records.map((record) => (
                <div key={record.id} className="record-item">
                  <div className="record-header">
                    <div className="record-title">
                      <span className="bazi-text">{record.baziData.fullBazi}</span>
                      <span className="date-text">{formatDate(record.createdAt)}</span>
                    </div>
                    <div className="record-actions">
                      <button
                        className="view-btn"
                        onClick={() => setSelectedRecord(record)}
                      >
                        查看详情
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteRecord(record.id)}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  <div className="record-summary">
                    <p><strong>出生信息：</strong>{formatBazi(record.baziData)} {record.baziData.gender === 'male' ? '男' : '女'}</p>
                    <p><strong>日元：</strong>{record.baziData.dayMaster.stem}（{record.baziData.dayMaster.element}）</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedRecord && (
          <div className="record-detail-modal">
            <div className="record-detail-content">
              <div className="record-detail-header">
                <h3>测算详情</h3>
                <button className="close-btn" onClick={() => setSelectedRecord(null)}>×</button>
              </div>
              <div className="record-detail-body">
                <div className="detail-section">
                  <h4>基本信息</h4>
                  <p><strong>八字：</strong>{selectedRecord.baziData.fullBazi}</p>
                  <p><strong>出生日期：</strong>{formatBazi(selectedRecord.baziData)}</p>
                  <p><strong>性别：</strong>{selectedRecord.baziData.gender === 'male' ? '男' : '女'}</p>
                  <p><strong>农历：</strong>{selectedRecord.baziData.lunarDate}</p>
                </div>

                <div className="detail-section">
                  <h4>分析结果</h4>
                  <div className="analysis-content">
                    <p><strong>整体概述：</strong>{selectedRecord.analysis.overview}</p>
                    <p><strong>日元分析：</strong>{selectedRecord.analysis.dayMaster}</p>
                    <p><strong>事业分析：</strong>{selectedRecord.analysis.career}</p>
                    <p><strong>财运分析：</strong>{selectedRecord.analysis.wealth}</p>
                    <p><strong>感情分析：</strong>{selectedRecord.analysis.relationships}</p>
                    <p><strong>健康分析：</strong>{selectedRecord.analysis.health}</p>
                    {selectedRecord.analysis.historicalFigure && (
                      <p><strong>历史人物相似度：</strong>{selectedRecord.analysis.historicalFigure}</p>
                    )}
                    {selectedRecord.analysis.musicRecommendation && (
                      <p><strong>音乐推荐：</strong>{selectedRecord.analysis.musicRecommendation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsList;