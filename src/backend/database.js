import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 根据环境确定数据库路径
const getDatabasePath = () => {
  if (process.env.VERCEL) {
    // Vercel 环境使用 /tmp 目录
    return '/tmp/database.json';
  } else if (process.env.NODE_ENV === 'production') {
    // 其他生产环境
    return path.join(process.cwd(), 'data', 'database.json');
  } else {
    // 开发环境
    return path.join(__dirname, '../../data/database.json');
  }
};

const dbPath = getDatabasePath();
const dbDir = path.dirname(dbPath);

// 确保数据库目录存在
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// 如果数据库文件不存在，创建初始数据
if (!fs.existsSync(dbPath)) {
  const initialData = {
    users: [],
    records: [],
    sessions: []
  };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {
  users: [],
  records: [],
  sessions: []
});

// 初始化数据库
await db.read();

// 确保数据结构存在
if (!db.data) {
  db.data = {
    users: [],
    records: [],
    sessions: []
  };
  await db.write();
}

// 确保所有必需的数组都存在
if (!db.data.users) db.data.users = [];
if (!db.data.records) db.data.records = [];
if (!db.data.sessions) db.data.sessions = [];

export default db;