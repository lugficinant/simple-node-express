//react router
import React from "react";

//
// BrowserRouter 👉 负责管理页面路由，它是所有路由的“容器”。
// Routes 👉 用于包含多个 Route，让 React 知道哪个 URL 应该渲染哪个组件。
// Route 👉 定义具体的页面路径，如 /about 对应 About 组件。
// Link 👉 导航链接，点击时不会刷新页面，而是切换组件。
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//pages
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
