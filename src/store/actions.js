import { USER_LOGIN } from "./contant.js";

export function userLoginAction(username) {
  return {
    type: USER_LOGIN,
    value: username,
  };
}
