@echo off
echo 🔧 修复404错误并重新部署
echo ============================

REM 步骤1：显示当前配置
echo 1. 当前Vercel配置：
type vercel.json

REM 步骤2：构建项目
echo 2. 构建项目...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败
    exit /b 1
)

REM 步骤3：提交更改
echo 3. 提交配置更改...
git add .
git commit -m "修复404错误：优化Vercel路由配置"
git push origin master

echo.
echo ✅ 修复完成！
echo.
echo 🚀 下一步操作：
echo 1. 访问 https://vercel.com
echo 2. 找到你的项目
echo 3. 点击 "Redeploy" 或等待自动部署
echo 4. 测试网站是否正常工作
echo.
echo ⏰ 部署通常需要2-3分钟
echo 📱 如果还有问题，请立即告诉我！

pause