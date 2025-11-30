import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = null;
    this.init();
  }

  async init() {
    if (this.token) {
      await this.getCurrentUser();
    }
  }

  // 设置认证头
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    };
  }

  // 用户注册
  async register(username, email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password
      });

      if (response.data.success) {
        this.token = null; // 注册后需要登录
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '注册失败');
    }
  }

  // 用户登录
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || '登录失败');
    }
  }

  // 获取当前用户信息
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });

      if (response.data.success) {
        this.user = response.data.user;
        return response.data.user;
      }
      throw new Error(response.data.message);
    } catch (error) {
      this.logout();
      throw new Error(error.response?.data?.message || '获取用户信息失败');
    }
  }

  // 用户登出
  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
  }

  // 检查是否已登录
  isAuthenticated() {
    return !!this.token;
  }

  // 获取当前用户（同步方法）
  getCurrentUser() {
    try {
      if (!this.token) return null;
      
      // 从token中解析用户信息（如果token是JWT格式）
      const payload = this.token.split('.')[1];
      if (payload) {
        const decoded = JSON.parse(atob(payload));
        return {
          id: decoded.userId || decoded.id,
          username: decoded.username || decoded.email,
          email: decoded.email
        };
      }
      return this.user;
    } catch (error) {
      console.warn('解析用户信息失败:', error);
      return null;
    }
  }

  // 获取令牌
  getToken() {
    return this.token;
  }
}

// 创建单例实例
export const authService = new AuthService();
export default authService;