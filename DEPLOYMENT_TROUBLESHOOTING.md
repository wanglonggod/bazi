# 🚨 Vercel部署失败 - 常见问题解决方案

## 错误1: "Build failed"
**症状**: 构建过程中失败
**解决**:
```bash
# 本地测试构建
npm run build

# 如果失败，清除缓存
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 错误2: "Cannot find module"
**症状**: 缺少依赖模块
**解决**:
```bash
# 确保所有依赖安装
npm install --production=false

# 检查package.json
npm list
```

## 错误3: "Environment variable not found"
**症状**: 环境变量缺失
**解决**:
1. 进入Vercel项目Settings
2. 点击Environment Variables
3. 添加:
   - JWT_SECRET: `ai-bazi-super-secret-key-2024-wanglong`
   - NODE_ENV: `production`

## 错误4: "Static file not found"
**症状**: 静态文件路径错误
**解决**: ✅ 已在server.js中修复

## 错误5: "API routes not working"
**症状**: API端点404错误
**解决**: ✅ 已在vercel.json中配置

---

## 🔧 立即修复步骤

### 1. 本地验证
```bash
# 测试构建
npm run build

# 检查文件结构
ls -la dist/

# 测试后端
node src/backend/server.js
```

### 2. 强制重新部署
```bash
# 提交更改
git add .
git commit -m "Fix deployment issues"
git push origin master
```

### 3. Vercel手动重新部署
1. 访问 vercel.com/dashboard
2. 选择你的项目
3. 点击 "Deploys" 标签
4. 点击最新commit的 "Redeploy" 按钮

---

## 📞 如果仍然失败

请提供以下信息，我来帮你分析：

1. **完整的Vercel错误日志截图**
2. **GitHub仓库地址**: https://github.com/wanglonggod/bazi
3. **本地构建是否成功**: `npm run build` 结果
4. **错误发生的具体步骤**

### 备用部署方案
如果Vercel持续失败，我们还有：
- **Railway** (推荐)
- **Render** 
- **Netlify** (前端) + **Railway** (后端)

告诉我具体的错误信息，我来帮你解决！💪