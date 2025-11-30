import { authService } from './authService.js';

export const authMiddleware = {
  // 验证用户身份
  authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: '未提供认证令牌' 
      });
    }

    const decoded = authService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: '无效的认证令牌' 
      });
    }

    req.userId = decoded.userId;
    next();
  },

  // 错误处理中间件
  errorHandler(err, req, res, next) {
    console.error('服务器错误:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: err.errors
      });
    }

    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({
        success: false,
        message: '数据冲突，可能已存在'
      });
    }

    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
  }
};