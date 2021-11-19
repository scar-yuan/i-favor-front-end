import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    console.log("启动");
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token")).token;
      console.log(token);
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(instance.defaults.headers);
    } else {
      console.log(111);
      delete instance.defaults.headers.common["Authorization"];
    }
    console.log("请求拦截器 成功");
    return config;
  },
  function (error) {
    console.log("请求拦截器 失败");
    return Promise.reject("error");
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log(response);
    if (response.data.code === 401) {
      //用户token失效
      //清空用户信息
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("info");
      console.log(1);
      window.location.href = "/login"; //返回登录页
      return Promise.reject("用户token失效"); //接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
    }
    if (response.status !== 200) {
      //接口请求失败，具体根据实际情况判断
      return Promise.reject("状态码错误"); //接口Promise返回错误状态
    }
    return Promise.resolve(response);
  },
  function (error) {
    if (axios.isCancel(error)) {
      throw new axios.Cancel("cancel request");
    } else {
      console.log("请求错误");
    }
    return Promise.reject(error);
  }
);

export default instance;
