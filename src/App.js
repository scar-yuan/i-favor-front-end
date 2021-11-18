import React, { useReducer, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Routes } from "react-router-dom";

import Home from "./pages/home/index.jsx";
import TodoList from "../src/pages/todolist/index.jsx";
import Collection from "../src/pages/collection/index.jsx";
// 测试用，
// import SortCollect from "../src/pages/collection/SortCollect.jsx";
import Study from "../src/pages/study/index";
import Login from "./pages/login/index";

import {
  ThemeContext,
  LoginContext,
  USER_LOGIN,
  USER_LOGOUT,
} from "./store/context";

import "antd/dist/antd.css";
import { GlobalStyle } from "./style.js";
import "./App.css";

// 定义初始化值
const initState = {
  username: "",
  token: "",
  isLogin: false,
};
// 定义state处理逻辑 reducer函数
function loginReducer(state, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...action.userLogin,
      };
    case USER_LOGOUT:
      return {
        ...action.userLogout,
      };
    default:
      return state;
  }
}

function App() {
  const [themeType, setThemeType] = useState(false);
  const [loginState, dispatch] = useReducer(loginReducer, initState);
  // 初始化主题
  useEffect(() => {
    const initTheme = async () => {
      let theme = await localStorage.getItem("theme");
      if (theme === null || theme === "false") {
        setThemeType(false);
      } else {
        setThemeType(true);
      }
    };
    initTheme();
  }, []);

  // 数据持久化
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: USER_LOGIN,
        userLogin: JSON.parse(localStorage.getItem("token")),
      });
    }
  }, [dispatch]);

  return (
    <LoginContext.Provider value={{ loginState, dispatch }}>
      <ThemeContext.Provider value={[themeType, setThemeType]} className="App">
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/todolist" exact component={TodoList} />
          <Route path="/collection" exact component={Collection} />
          <Route path="/study" exact component={Study} />
          <Route path="/login" exact component={Login} />
        </Routes>
        <GlobalStyle dark={themeType} />
      </ThemeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
