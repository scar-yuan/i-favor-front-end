import React from "react";
import { Route, BrowserRouter as Routes } from "react-router-dom";

import Home from "./pages/home/index.jsx";
import TodoList from "../src/pages/todolist/index.jsx";
import Collection from "../src/pages/collection/index.jsx";
import Study from "../src/pages/study/index";
import Login from "./pages/login/index";

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
    </div>
  );
}

export default App;
