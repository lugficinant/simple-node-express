// database.js
import sqlite3 from "sqlite3";

// create / connect to database
const db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error("can not connect to database", err.message);
  } else {
    console.log("connect to database successfully ");
  }
});

// **``````````````````````````````封装数据库use.DB``````````````````````````**
const useDB = {
  // **初始化数据库**
  initializeDatabase: () => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT
            )`,
      (err) => {
        if (err) console.error("fail to create user table:", err.message);
        else console.log("user table created 👌");
      }
    );
  },

  // **插入用户**
  insertUser: (email, password, callback) => {
    const stmt = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    );
    stmt.run(email, password, function (err) {
      if (err) callback(err, null);
      else callback(null, this.lastID);
    });
    stmt.finalize();
  },

  // **查询所有用户**
  getUsers: (callback) => {
    db.all("SELECT id, email FROM users", [], (err, rows) => {
      if (err) callback(err, null);
      else callback(null, rows);
    });
  },

  // **更新用户密码**
  updateUser: (email, newPassword, callback) => {
    db.run(
      "UPDATE users SET password = ? WHERE email = ?",
      [newPassword, email],
      function (err) {
        if (err) callback(err, null);
        else callback(null, this.changes);
      }
    );
  },

  // **删除用户**
  deleteUser: (email, callback) => {
    db.run("DELETE FROM users WHERE email = ?", [email], function (err) {
      if (err) callback(err, null);
      else callback(null, this.changes);
    });
  },

  // **关闭数据库**
  closeDatabase: () => {
    db.close((err) => {
      if (err) console.error("关闭数据库失败:", err.message);
      else console.log("数据库连接已关闭");
    });
  },
};

export default useDB;
