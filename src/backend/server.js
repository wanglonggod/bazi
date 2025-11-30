import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authService } from './authService.js';
import { recordService } from './recordService.js';
import { authMiddleware } from './authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '服务器运行正常' });
});

// 用户注册
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '请提供用户名、邮箱和密码'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '密码长度至少为6位'
      });
    }

    const user = await authService.register(username, email, password);
    res.json({
      success: true,
      message: '注册成功',
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 用户登录
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '请提供邮箱和密码'
      });
    }

    const result = await authService.login(email, password);
    res.json({
      success: true,
      message: '登录成功',
      ...result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// 获取用户信息
app.get('/api/auth/me', authMiddleware.authenticate, async (req, res) => {
  try {
    const user = await authService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 保存测算记录
app.post('/api/records', authMiddleware.authenticate, async (req, res) => {
  try {
    const { baziData, analysis } = req.body;
    
    if (!baziData || !analysis) {
      return res.status(400).json({
        success: false,
        message: '请提供八字数据和分析结果'
      });
    }

    const record = await recordService.saveRecord(req.userId, baziData, analysis);
    res.json({
      success: true,
      message: '测算记录保存成功',
      record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 获取用户的测算记录
app.get('/api/records', authMiddleware.authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const records = await recordService.getUserRecords(req.userId, limit);
    
    res.json({
      success: true,
      records,
      total: records.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 获取单条记录详情
app.get('/api/records/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id, req.userId);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: '记录不存在'
      });
    }

    res.json({
      success: true,
      record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 删除记录
app.delete('/api/records/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    await recordService.deleteRecord(req.params.id, req.userId);
    res.json({
      success: true,
      message: '记录删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 错误处理中间件
app.use(authMiddleware.errorHandler);

// 静态文件服务（用于生产环境）
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../../dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`API 地址: http://localhost:${PORT}/api`);
  });
}

export default app;