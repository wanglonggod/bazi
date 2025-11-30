#!/bin/bash

# AI八字算命 - 部署脚本

echo "🚀 开始部署 AI八字算命应用..."

# 1. 构建前端
echo "📦 构建前端..."
npm run build

# 2. 检查构建结果
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist目录不存在"
    exit 1
fi

# 3. 显示部署选项
echo ""
echo "✅ 构建完成！请选择部署方式："
echo ""
echo "🌐 选项1: 部署到 Vercel (推荐)"
echo "   - 支持全栈部署"
echo "   - 免费托管"
echo "   - 自动HTTPS"
echo ""
echo "📄 选项2: 仅部署前端到 GitHub Pages"
echo "   - 仅静态页面"
echo "   - 需要另外部署后端"
echo ""
echo "☁️ 选项3: 其他云平台"
echo "   - Railway, Render, Netlify等"
echo ""

# 4. 提供具体部署步骤
echo "📋 具体部署步骤："
echo ""
echo "Vercel部署："
echo "1. 访问 https://vercel.com"
echo "2. 点击 'New Project'"
echo "3. 导入GitHub仓库"
echo "4. 配置环境变量："
echo "   - JWT_SECRET=your-secret-key"
echo "   - NODE_ENV=production"
echo "5. 点击部署"
echo ""
echo "GitHub Pages部署："
echo "1. 将dist文件夹推送到gh-pages分支"
echo "2. 在GitHub仓库设置中启用Pages"
echo "3. 选择gh-pages分支作为源"
echo ""

echo "🎉 部署准备完成！"