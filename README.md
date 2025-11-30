# AI八字算命应用

一个基于React和Node.js的AI八字算命全栈应用。

## 🌟 功能特性

- 🔮 **AI八字测算**: 智能分析生辰八字
- 👤 **用户系统**: 注册、登录、个人中心
- 💾 **记录保存**: 保存和查看历史测算
- 📱 **响应式设计**: 适配所有设备
- 🌍 **云端部署**: 支持Vercel等平台

## 🚀 技术栈

- **前端**: React + Vite
- **后端**: Node.js + Express
- **数据库**: LowDB (JSON文件)
- **认证**: JWT
- **部署**: Vercel

## 📦 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🌐 部署

支持部署到多个平台：
- **Vercel**: 全栈免费部署（推荐）
- **Railway**: 全栈部署
- **Render**: Node.js托管

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📄 项目结构

```
├── src/
│   ├── backend/     # 后端API
│   ├── components/    # React组件
│   ├── services/    # 前端服务
│   └── utils/       # 工具函数
├── data/            # 数据库文件
├── dist/           # 构建输出
└── vercel.json     # Vercel配置
```

## 🎯 使用说明

1. 注册/登录账号
2. 输入出生日期和时间
3. 获取AI八字分析
4. 保存测算记录
5. 查看历史记录

## 🔒 环境变量

```bash
JWT_SECRET=your-super-secret-key
NODE_ENV=production
```

## 📞 支持

如有问题，请查看部署文档或提交Issue。

---

🎉 **享受AI八字算命的神奇体验吧！**