import React, { useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Routes } from "react-router-dom";

import Home from "./pages/home/index.jsx";
import TodoList from "../src/pages/todolist/index.jsx";
import Collection from "../src/pages/collection/index.jsx";
import Study from "../src/pages/study/index";

import Login from "./pages/login/index";
import "antd/dist/antd.css";
import { GlobalStyle } from "./style.js";
import "./App.css";
export const ThemeContext = React.createContext("");

function App() {
  const [themeType, setThemeType] = useState(false);
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

  return (
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
  );
}

export default App;
