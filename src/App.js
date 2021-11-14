import React from "react";
import { Route, BrowserRouter as Routes } from "react-router-dom";

import Home from "./pages/home/index.jsx";
import TodoList from "../src/pages/todolist/index.jsx";
import Collection from "../src/pages/collection/index.jsx";
import Study from "../src/pages/study/index";
<<<<<<< HEAD
=======
import Login from "./pages/login/index";
>>>>>>> 6df2ad2d88e1ee0911f3c76602f6d13c8c3e2e6f
import "antd/dist/antd.css";
import { GlobalStyle } from "./style.js";

import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/todolist" exact component={TodoList} />
        <Route path="/collection" exact component={Collection} />
        <Route path="/study" exact component={Study} />
        <Route path="/login" exact component={Login} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
