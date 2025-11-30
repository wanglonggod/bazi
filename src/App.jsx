import { useState, useEffect } from 'react'
import BaziCalculator from './components/BaziCalculator'
import AuthModal from './components/AuthModal'
import RecordsList from './components/RecordsList'
import { authService } from './services/authService.js'
import { animationClasses } from './utils/animations'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    setMounted(true)
    
    // 检查用户登录状态
    const user = authService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
    
    // 添加页面加载完成时的动画效果
    const headerElements = document.querySelectorAll('.app-header h1, .app-header p');
    headerElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add(animationClasses.fadeIn);
      }, index * 200);
    });
  }, [])

  const handleAuthSuccess = (user) => {
    setCurrentUser(user)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    authService.logout()
    setCurrentUser(null)
  }

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <div className={`app ${animationClasses.pageTransition} ${animationClasses.gradientShift}`}>
      <header className="app-header">
        <h1 style={{ opacity: 0 }}>AI八字算命</h1>
        <p style={{ opacity: 0 }}>智能命理分析，探索人生奥秘</p>
        
        {/* 用户认证区域 */}
        <div className="auth-section">
          {currentUser ? (
            <div className="user-info">
              <span className="username">欢迎，{currentUser.username}</span>
              <button 
                className="auth-btn records-btn"
                onClick={() => setIsRecordsModalOpen(true)}
              >
                我的记录
              </button>
              <button 
                className="auth-btn logout-btn"
                onClick={handleLogout}
              >
                退出登录
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="auth-btn login-btn"
                onClick={() => openAuthModal('login')}
              >
                登录
              </button>
              <button 
                className="auth-btn register-btn"
                onClick={() => openAuthModal('register')}
              >
                注册
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="app-main">
        <BaziCalculator currentUser={currentUser} />
      </main>
      
      <footer className="app-footer">
        <p>© 2024 AI八字算命 | 仅供娱乐参考</p>
      </footer>

      {/* 认证模态框 */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 记录列表模态框 */}
      <RecordsList
        isOpen={isRecordsModalOpen}
        onClose={() => setIsRecordsModalOpen(false)}
      />
    </div>
  )
}

export default App