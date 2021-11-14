import {
  createStore,
  applyMiddleware, //中间件
} from "redux";

import reducers from "./reducer.js";
import thunk from "redux-thunk";

export default createStore(
  reducers,
  applyMiddleware(thunk) //使用中间件thunk,使得dispatch(),能够接收一个函数作为参数
);
