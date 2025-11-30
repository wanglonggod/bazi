#!/bin/bash

echo "🔍 部署前验证检查"
echo "===================="

# 检查1：Node.js版本
echo "1. 检查Node.js版本..."
node --version

# 检查2：构建状态
echo "2. 验证构建..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 检查3：dist目录内容
echo "3. 检查构建输出..."
if [ -d "dist" ]; then
    echo "✅ dist目录存在"
    echo "文件列表："
    ls -la dist/
else
    echo "❌ dist目录不存在"
    exit 1
fi

# 检查4：后端文件
echo "4. 检查后端文件..."
if [ -f "src/backend/server.js" ]; then
    echo "✅ 后端文件存在"
else
    echo "❌ 后端文件缺失"
    exit 1
fi

# 检查5：Vercel配置
echo "5. 检查Vercel配置..."
if [ -f "vercel.json" ]; then
    echo "✅ Vercel配置文件存在"
    echo "配置内容："
    cat vercel.json
else
    echo "❌ Vercel配置文件缺失"
    exit 1
fi

echo ""
echo "🎉 所有检查通过！"
echo "🚀 现在可以安全部署到Vercel了"
echo ""
echo "📱 部署地址将类似：https://xxx.vercel.app"