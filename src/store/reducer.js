import cloneDeep from "lodash/cloneDeep"; //按需引入

import { USER_LOGIN } from "./contant.js";
const defaultState = {
  //默认初始状态
  username: "xxx",
};

export default function reducer(state = defaultState, action) {
  const { type, value } = action;
  switch (type) {
    case USER_LOGIN:
      let newState1 = cloneDeep(state);
      newState1.username = value;
      return newState1;
    default:
  }
  return state;
}
