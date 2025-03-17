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
        if (err) {
          console.error("Fail to create user table:", err.message);
        } else {
          console.log("User table created 👌");
          // avoid duplicated insertion
          db.run(
            `INSERT OR IGNORE INTO users (email, password) VALUES 
            ('test@example.com', '123'),
            ('fake@example.com', '456')`,
            (err) => {
              if (err) console.error("Fail to insert test users:", err.message);
              else
                console.log("Test users inserted ✅, everything is ready 😁😁");
            }
          );
        }
      }
    );
  },
  //delete everything
  clearUsersTable: () => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM users", (err) => {
        if (err) return reject(err);
        db.run("DELETE FROM sqlite_sequence WHERE name='users'", (err) => {
          if (err) reject(err);
          else resolve("Users table cleared ✅");
        });
      });
    });
  },

  // data manipulation
  //insert
  insertUser: (email, password) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      );
      stmt.run(email, password, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
      stmt.finalize();
    });
  },

  // query
  getUserByEmailAndPassword: (email, password) => {
    return new Promise((resolve, reject) => {
      //三个参数
      //SQL语句, 参数数组, 查询结果/错误
      //所以get方法的第三个参数, 就是回调函数, 让我们自行决定处理结果,
      // 我们就用结果去生成对应成功和失败的promise
      db.get(
        "SELECT id, email FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, user) => {
          if (err) reject(err);
          else resolve(user ?? null);
        }
      );
    });
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // update
  updateUser: (email, newPassword) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE users SET password = ? WHERE email = ?",
        [newPassword, email],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  // delete
  deleteUser: (email) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM users WHERE email = ?", [email], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
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
