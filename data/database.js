// database.js
import sqlite3 from 'sqlite3';

// create / connect to database
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('can not connect to database', err.message);
    } else {
        console.log('connect to database successfully ');
    }
});

// create
export const createTable = () => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)",
        (err) => {
            if (err) {
                console.error('Create table failed:', err.message);
            } else {
                console.log('Table created successfully');
            }
        }
    );
};

// insert
export const insertUser = (email, password) => {
    const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    stmt.run(email, password, (err) => {
        if (err) {
            console.error('Insert failed:', err.message);
        } else {
            console.log(`User ${email} inserted successfully`);
        }
    });
    stmt.finalize();
};

// inquiry
export const getUsers = (callback) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.error('查询数据失败:', err.message);
        } else {
            callback(rows);
        }
    });
};

// 更新数据
export const updateUser = (name, age) => {
    db.run("UPDATE users SET age = ? WHERE name = ?", [age, name], (err) => {
        if (err) {
            console.error('更新数据失败:', err.message);
        } else {
            console.log('数据更新成功');
        }
    });
};
``
// 删除数据
export const deleteUser = (name) => {
    db.run("DELETE FROM users WHERE name = ?", [name], (err) => {
        if (err) {
            console.error('删除数据失败:', err.message);
        } else {
            console.log('数据删除成功');
        }
    });
};

// 关闭数据库连接
export const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.error('关闭数据库失败:', err.message);
        } else {
            console.log('数据库连接关闭');
        }
    });
};



export default db;