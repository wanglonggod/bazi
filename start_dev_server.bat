@echo off

echo 正在启动八字算命应用开发服务器...

rem 使用npm install安装依赖（如果需要）
echo 检查依赖...
npm install --loglevel=error >nul 2>nul
if %errorlevel% equ 0 (
    echo 依赖安装成功
) else (
    echo 依赖可能已安装或需要手动检查
)

rem 启动开发服务器
echo 启动开发服务器...
npm run dev

pause