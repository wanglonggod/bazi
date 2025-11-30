// 主题配置文件
export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#f39c12',
  danger: '#e74c3c',
  success: '#2ecc71',
  background: {
    dark: '#242424',
    light: '#ffffff',
    gradient1: '#667eea',
    gradient2: '#764ba2',
  },
  text: {
    primary: '#333333',
    secondary: '#555555',
    light: '#ffffff',
    muted: '#666666',
  },
  // 五行颜色
  elements: {
    wood: '#4CAF50',
    fire: '#FF5722',
    earth: '#FFC107',
    metal: '#9E9E9E',
    water: '#2196F3',
  },
};

export const typography = {
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  headings: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '15px',
  full: '50%',
};

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 10px 30px rgba(0, 0, 0, 0.3)',
};

export const animations = {
  duration: {
    fast: '0.3s',
    normal: '0.5s',
    slow: '0.8s',
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// 天干地支数据
export const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 生肖数据
export const zodiacAnimals = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
  '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
  '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪'
};

// 五行相生相克关系
export const fiveElements = {
  generating: {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  },
  overcoming: {
    '木': '土', '火': '金', '土': '水', '金': '木', '水': '火'
  }
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  heavenlyStems,
  earthlyBranches,
  zodiacAnimals,
  fiveElements,
};