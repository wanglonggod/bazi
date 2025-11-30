// 动画效果配置文件

// 动画时长常量
export const animationDurations = {
  fast: '200ms',
  normal: '300ms',
  slow: '500ms'
};

// 动画时间函数
export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// 动画类名
export const animationClasses = {
  // 淡入动画
  fadeIn: 'animation-fade-in',
  
  // 滑入动画
  slideInUp: 'animation-slide-in-up',
  slideInDown: 'animation-slide-in-down',
  slideInLeft: 'animation-slide-in-left',
  slideInRight: 'animation-slide-in-right',
  
  // 缩放动画
  scaleIn: 'animation-scale-in',
  scaleUp: 'animation-scale-up',
  
  // 旋转动画
  rotateIn: 'animation-rotate-in',
  
  // 脉动动画
  pulse: 'animation-pulse',
  
  // 震动动画
  shake: 'animation-shake',
  
  // 悬浮效果
  hoverLift: 'hover-lift',
  hoverGlow: 'hover-glow',
  hoverScale: 'hover-scale',
  
  // 加载动画
  loading: 'animation-loading',
  
  // 页面转场
  pageTransition: 'page-transition',
  
  // 渐变动画
  gradientShift: 'gradient-shift'
};

// CSS动画定义
export const animationStyles = `
  /* 淡入动画 */
  .${animationClasses.fadeIn} {
    animation: fadeIn ${animationDurations.slow} ${easing.easeInOut} forwards;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* 滑入动画 */
  .${animationClasses.slideInUp} {
    animation: slideInUp ${animationDurations.normal} ${easing.easeOut} forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .${animationClasses.slideInDown} {
    animation: slideInDown ${animationDurations.normal} ${easing.easeOut} forwards;
    opacity: 0;
    transform: translateY(-20px);
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .${animationClasses.slideInLeft} {
    animation: slideInLeft ${animationDurations.normal} ${easing.easeOut} forwards;
    opacity: 0;
    transform: translateX(-20px);
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .${animationClasses.slideInRight} {
    animation: slideInRight ${animationDurations.normal} ${easing.easeOut} forwards;
    opacity: 0;
    transform: translateX(20px);
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* 缩放动画 */
  .${animationClasses.scaleIn} {
    animation: scaleIn ${animationDurations.fast} ${easing.easeOut} forwards;
    opacity: 0;
    transform: scale(0.9);
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .${animationClasses.scaleUp} {
    animation: scaleUp ${animationDurations.normal} ${easing.bounce} forwards;
    opacity: 0;
    transform: scale(0);
  }
  
  @keyframes scaleUp {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* 旋转动画 */
  .${animationClasses.rotateIn} {
    animation: rotateIn ${animationDurations.normal} ${easing.easeOut} forwards;
    opacity: 0;
    transform: rotate(-10deg) scale(0.9);
  }
  
  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-10deg) scale(0.9);
    }
    to {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
  }
  
  /* 脉动动画 */
  .${animationClasses.pulse} {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* 震动动画 */
  .${animationClasses.shake} {
    animation: shake ${animationDurations.fast} ${easing.easeInOut};
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  /* 悬浮效果 */
  .${animationClasses.hoverLift} {
    transition: transform ${animationDurations.normal} ${easing.easeOut}, 
                box-shadow ${animationDurations.normal} ${easing.easeOut};
  }
  
  .${animationClasses.hoverLift}:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .${animationClasses.hoverGlow} {
    transition: box-shadow ${animationDurations.normal} ${easing.easeOut};
  }
  
  .${animationClasses.hoverGlow}:hover {
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
  }
  
  .${animationClasses.hoverScale} {
    transition: transform ${animationDurations.fast} ${easing.easeOut};
  }
  
  .${animationClasses.hoverScale}:hover {
    transform: scale(1.03);
  }
  
  /* 加载动画 */
  .${animationClasses.loading} {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #d4af37;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* 页面转场 */
  .${animationClasses.pageTransition} {
    animation: pageTransition ${animationDurations.slow} ${easing.easeInOut};
  }
  
  @keyframes pageTransition {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 渐变动画 */
  .${animationClasses.gradientShift} {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* 交错动画延迟 */
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  
  /* 响应式动画调整 */
  @media (max-width: 768px) {
    .${animationClasses.slideInUp},
    .${animationClasses.slideInDown},
    .${animationClasses.slideInLeft},
    .${animationClasses.slideInRight} {
      animation-duration: ${animationDurations.fast};
    }
  }
`;

// 导出动画工具函数
/**
 * 添加动画类并在完成后移除
 * @param {HTMLElement} element - 目标元素
 * @param {string} animationClass - 动画类名
 * @param {Function} callback - 动画完成后的回调
 */
export const animateOnce = (element, animationClass, callback) => {
  if (!element) return;
  
  element.classList.add(animationClass);
  
  const onAnimationEnd = () => {
    element.classList.remove(animationClass);
    element.removeEventListener('animationend', onAnimationEnd);
    if (callback) callback();
  };
  
  element.addEventListener('animationend', onAnimationEnd);
};

/**
 * 为一组元素添加交错动画
 * @param {HTMLElement[]} elements - 元素数组
 * @param {string} animationClass - 动画类名
 * @param {number} delay - 每个元素之间的延迟时间（毫秒）
 */
export const staggerAnimation = (elements, animationClass, delay = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, index * delay);
  });
};

/**
 * 触发元素重排以应用动画
 * @param {HTMLElement} element - 目标元素
 */
export const triggerReflow = (element) => {
  if (!element) return;
  void element.offsetWidth;
};

// 保留旧的对象格式以保持向后兼容
export const animationUtils = {
  animateOnce,
  staggerAnimation,
  triggerReflow
};