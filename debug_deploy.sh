#!/bin/bash

echo "🔍 Vercel部署错误排查工具"
echo "=================================="

# 检查Node.js版本
echo "1. 检查Node.js版本..."
node --version
echo ""

# 检查npm版本
echo "2. 检查npm版本..."
npm --version
echo ""

# 检查依赖安装
echo "3. 检查依赖安装..."
npm install --production=false
echo ""

# 检查构建过程
echo "4. 检查构建过程..."
npm run build
echo ""

# 检查文件结构
echo "5. 检查项目文件结构..."
ls -la
echo ""

# 检查dist目录
echo "6. 检查构建输出..."
if [ -d "dist" ]; then
    echo "✅ dist目录存在"
    ls -la dist/
else
    echo "❌ dist目录不存在"
fi
echo ""

# 检查环境变量
echo "7. 检查环境变量配置..."
if [ -f ".env" ]; then
    echo "✅ .env文件存在"
else
    echo "⚠️  .env文件不存在（使用.env.example）"
fi
echo ""

# 检查关键文件
echo "8. 检查关键文件..."
files=("vercel.json" "package.json" "src/backend/server.js" "dist/index.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 不存在"
    fi
done
echo ""

echo "🔧 修复建议："
echo "1. 确保所有依赖正确安装: npm install"
echo "2. 确保构建成功: npm run build"
echo "3. 检查vercel.json配置"
echo "4. 在Vercel控制台设置环境变量"
echo "5. 检查GitHub仓库权限"
echo ""

echo "📞 如果问题持续，请提供："
echo "- 完整的错误日志"
echo "- Vercel部署页面截图"
echo "- 项目GitHub仓库地址"