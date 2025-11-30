#!/bin/bash

echo "🚀 重新创建Vercel部署"
echo "========================"

# 步骤1：确保项目构建成功
echo "1. 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误"
    exit 1
fi

echo "✅ 构建成功"

# 步骤2：检查构建输出
echo "2. 检查构建输出..."
if [ -d "dist" ]; then
    echo "✅ dist目录存在"
    ls -la dist/
else
    echo "❌ dist目录不存在"
    exit 1
fi

# 步骤3：显示下一步操作
echo ""
echo "📋 下一步操作："
echo "1. 访问 https://vercel.com"
echo "2. 点击 'New Project'"
echo "3. 导入 GitHub 仓库 'wanglonggod/bazi'"
echo "4. 配置环境变量："
echo "   - JWT_SECRET: ai-bazi-super-secret-key-2024-wanglong"
echo "   - NODE_ENV: production"
echo "5. 点击 'Deploy'"
echo ""
echo "🔧 或者使用 Vercel CLI:"
echo "npm i -g vercel"
echo "vercel --prod"
echo ""
echo "📞 如果遇到问题，请告诉我具体的错误信息！"