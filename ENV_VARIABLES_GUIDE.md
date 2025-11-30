# Vercel环境变量配置指南

## 🔐 什么是环境变量？

环境变量是存储敏感信息和配置的方式，不会暴露在代码中。

## 📋 必需的环境变量

### 1. JWT_SECRET
- **作用**: JWT令牌加密密钥
- **格式**: 任意字符串（建议复杂一些）
- **示例**: `ai-bazi-super-secret-key-2024-wanglong`

### 2. NODE_ENV
- **作用**: 设置运行环境
- **格式**: `production` 或 `development`
- **示例**: `production`

## 🎯 配置步骤

### 在Vercel控制台：

1. **进入项目设置**
   ```
   Vercel控制台 → 选择项目 → Settings → Environment Variables
   ```

2. **添加环境变量**
   ```
   点击 "Add Environment Variable"
   
   输入：
   Name: JWT_SECRET
   Value: ai-bazi-super-secret-key-2024-wanglong
   
   点击 "Add"
   
   再次点击 "Add Environment Variable"
   
   输入：
   Name: NODE_ENV
   Value: production
   
   点击 "Add"
   ```

3. **应用到环境**
   ```
   Environment: Production (默认)
   Git Branch: 所有分支或指定分支
   ```

## ⚠️ 重要提醒

### JWT_SECRET设置建议：
- ✅ 使用至少32个字符
- ✅ 包含大小写字母、数字和特殊字符
- ✅ 每个项目使用不同的密钥
- ❌ 不要使用简单的密码
- ❌ 不要泄露给他人

### 好的JWT_SECRET示例：
```
ai-bazi-2024-super-secret-key-wanglong-god-!@#$%
WangLong-BaZi-AI-2024-Secret-Key-For-JWT-Tokens
bazi-ai-calculator-jwt-secret-2024-wanglong-god
```

### 不好的JWT_SECRET示例：
```
123456
password
admin
secret
```

## 🔍 验证配置

配置完成后：
1. 重新部署项目
2. 测试用户注册/登录功能
3. 验证JWT令牌是否正常工作

## 🛠️ 本地开发环境变量

创建 `.env` 文件（不要上传到GitHub）：
```
JWT_SECRET=your-local-development-secret-key
NODE_ENV=development
```

## 📚 常见问题

**Q: 环境变量什么时候生效？**
A: 添加后需要重新部署项目才生效。

**Q: 可以修改环境变量吗？**
A: 可以，修改后需要重新部署。

**Q: 环境变量安全吗？**
A: Vercel会加密存储，只有项目所有者可以查看和管理。

**Q: 忘记了JWT_SECRET怎么办？**
A: 可以重新生成一个新的，然后重新部署。