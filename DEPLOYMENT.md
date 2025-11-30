# AI八字算命 - 部署指南

## 🌐 在线访问

本项目已配置为支持多种部署方式。

## 🚀 快速部署到 Vercel

### 步骤1：准备代码
```bash
# 确保你已经构建了前端
npm run build

# 确保后端服务器正常运行
npm install
```

### 步骤2：部署到 Vercel
1. 访问 [Vercel官网](https://vercel.com)
2. 导入你的GitHub仓库
3. 配置环境变量（可选）
4. 点击部署

### 步骤3：环境变量配置
在Vercel控制台添加以下环境变量：
- `JWT_SECRET` - JWT密钥（自动生成或自定义）
- `NODE_ENV` - 设置为 `production`

## 📁 项目结构

```
├── src/
│   ├── backend/     # 后端API
│   ├── components/  # React组件
│   └── services/    # 前端服务
├── dist/           # 构建输出
├── data/           # 数据库文件
└── vercel.json     # Vercel配置
```

## 🔧 技术栈

- **前端**: React + Vite
- **后端**: Node.js + Express
- **数据库**: LowDB (JSON文件)
- **认证**: JWT
- **部署**: Vercel

## 📱 功能特性

- ✅ AI八字测算
- ✅ 用户注册登录
- ✅ 测算记录保存
- ✅ 响应式设计
- ✅ 免费托管

## 🌍 其他部署选项

### GitHub Pages（仅前端）
如果只需要前端展示，可以部署到GitHub Pages：
```bash
npm run build
# 将dist文件夹推送到gh-pages分支
```

### 其他全栈平台
- **Railway**: 支持全栈部署
- **Render**: 免费Node.js托管
- **Netlify**: 支持serverless函数

## ⚠️ 注意事项

1. **数据库**: 使用JSON文件数据库，适合小型应用
2. **文件存储**: 数据会持久化，但建议定期备份
3. **性能**: 适合个人或小团队使用
4. **安全**: 生产环境请使用强JWT密钥