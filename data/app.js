// app.js
import { insertUser, createTable, closeDatabase } from './database.js';  // 导入数据库操作函数

// 创建表
createTable();

// JSON 数据
const jsonData = [
    { "email": "test@gmail.com", "password": "1234" },
    { "email": "fake@gmail.com", "password": "1234" }
];

// 插入数据到数据库
jsonData.forEach(user => {
    insertUser(user.email, user.password);  // 使用导入的函数插入数据
});



