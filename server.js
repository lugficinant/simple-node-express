//config my server
// const express = require('express');
// const path = require('path');
import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import cors from "cors";
import useDB from "./data/database.js";
const app = express();
const port = 8080;

//link to static file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "client/dist")));

// 解析请求体
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//initial DB
useDB.initializeDatabase();

//```````````````````router`````````````````````````
// home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

//``````````````````````````````````````
app.post("/test", async (req, res) => {
  const { email, password } = req.body;
  console.log("``````````login request``````````");
  console.log("Received login request  from user :", email, password);
  console.log("POST request received");
  let userId = null;
  //validation
  try {
    userId = await useDB.getUserByEmailAndPassword(email, password);
    userId
      ? console.log("here you are MY USER😘😘:", userId)
      : console.log("sry we didnt find you in database 😒😒");
  } catch (err) {
    console.error("Insert error:", err);
  }

  res.json({ success: true, message: userId });
});

// 登录成功页面
app.get("/success", (req, res) => {
  res.send(`
    <h1>Login Successful!</h1>
    <p>Welcome to the secret page.</p>
  `);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//

try {
  const users = await useDB.getAllUsers();
  console.log("All Users:", users);
} catch (err) {
  console.error("Error fetching users:", err);
}
