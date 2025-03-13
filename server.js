const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'client/dist')));

// 解析请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 根路径路由，返回简单的登录表单
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});


// 登录处理路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 简单的用户名密码验证
  if (username === 'admin' && password === 'password') {
    // 登录成功，跳转到成功页面
    res.redirect('/success');
  } else {
    // 登录失败，返回首页并提示错误
    res.send(`
      <h1>Invalid credentials, please try again.</h1>
      <a href="/">Back to Login</a>
    `);
  }
});

// 登录成功页面
app.get('/success', (req, res) => {
  res.send(`
    <h1>Login Successful!</h1>
    <p>Welcome to the secret page.</p>
  `);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


