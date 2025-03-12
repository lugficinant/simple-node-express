// database.js
const sqlite3 = require('sqlite3').verbose();

// create / connect to database
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('can not connect to database', err.message);
    } else {
        console.log('connect to database successfully ');
    }
});

// create
const createTable = () => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)", (err) => {
        if (err) {
            console.error('Create fail', err.message);
        } else {
            console.log('Create Success');
        }
    });
};

// insert
const insertUser = (name, age) => {
    const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
    stmt.run(name, age, (err) => {
        if (err) {
            console.error('插入数据失败:', err.message);
        } else {
            console.log(`用户 ${name} 插入成功`);
        }
    });
    stmt.finalize();
};

// inquiry
const getUsers = (callback) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.error('查询数据失败:', err.message);
        } else {
            callback(rows);
        }
    });
};

// 更新数据
const updateUser = (name, age) => {
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
const deleteUser = (name) => {
    db.run("DELETE FROM users WHERE name = ?", [name], (err) => {
        if (err) {
            console.error('删除数据失败:', err.message);
        } else {
            console.log('数据删除成功');
        }
    });
};

// 关闭数据库连接
const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.error('关闭数据库失败:', err.message);
        } else {
            console.log('数据库连接关闭');
        }
    });
};

// 导出操作
module.exports = {
    createTable,
    insertUser,
    getUsers,
    updateUser,
    deleteUser,
    closeDatabase
};
