#!/bin/bash

echo "🚀 使用Vercel网站重新部署"
echo "=============================="

# 步骤1：确保项目构建成功
echo "1. 验证项目构建..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误"
    exit 1
fi

echo "✅ 构建成功"

# 步骤2：显示文件结构
echo "2. 项目文件结构："
ls -la dist/

echo ""
echo "🌐 请按以下步骤操作："
echo "1. 打开浏览器访问：https://vercel.com"
echo "2. 登录你的Vercel账号"
echo "3. 点击 'New Project' 或 '+' 按钮"
echo "4. 选择 'Import Git Repository'"
echo "5. 找到你的仓库 'wanglonggod/bazi'"
echo "6. 配置环境变量："
echo "   - JWT_SECRET = ai-bazi-super-secret-key-2024-wanglong"
echo "   - NODE_ENV = production"
echo "7. 点击 'Deploy' 按钮"
echo ""
echo "⏰ 部署通常需要2-3分钟"
echo "📱 部署完成后，你会获得一个类似 https://xxx.vercel.app 的网址"
echo ""
echo "❓ 如果遇到任何问题，请截图给我看！"