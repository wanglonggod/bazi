import axios from 'axios';
import { authService } from './authService.js';

const API_BASE_URL = 'http://localhost:3001/api';

class RecordService {
  // 获取认证头
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`
    };
  }

  // 保存测算记录
  async saveRecord(baziData, analysis) {
    try {
      const response = await axios.post(`${API_BASE_URL}/records`, {
        baziData,
        analysis
      }, {
        headers: this.getAuthHeaders()
      });

      if (response.data.success) {
        return response.data.record;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '保存记录失败');
    }
  }

  // 获取用户的测算记录
  async getUserRecords(limit = 50) {
    try {
      const response = await axios.get(`${API_BASE_URL}/records?limit=${limit}`, {
        headers: this.getAuthHeaders()
      });

      if (response.data.success) {
        return response.data.records;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '获取记录失败');
    }
  }

  // 获取单条记录详情
  async getRecordById(recordId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/records/${recordId}`, {
        headers: this.getAuthHeaders()
      });

      if (response.data.success) {
        return response.data.record;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '获取记录详情失败');
    }
  }

  // 删除记录
  async deleteRecord(recordId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/records/${recordId}`, {
        headers: this.getAuthHeaders()
      });

      if (response.data.success) {
        return true;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '删除记录失败');
    }
  }
}

export const recordService = new RecordService();
export default recordService;