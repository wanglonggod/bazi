import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authService = {
  // 生成JWT令牌
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  },

  // 验证JWT令牌
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  // 用户注册
  async register(username, email, password) {
    // 检查用户是否已存在
    const existingUser = db.data.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      throw new Error('用户已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    db.data.users.push(newUser);
    await db.write();

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // 用户登录
  async login(email, password) {
    // 查找用户
    const user = db.data.users.find(u => u.email === email);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('密码错误');
    }

    // 更新最后登录时间
    user.lastLogin = new Date().toISOString();
    await db.write();

    // 生成令牌
    const token = this.generateToken(user.id);

    // 返回用户信息和令牌
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  },

  // 获取用户信息
  async getUserById(userId) {
    const user = db.data.users.find(u => u.id === userId);
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};