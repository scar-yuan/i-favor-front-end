const darkTheme = (state) => {
  // state 为 true 时 深色 ，false 浅色
  if (!state) {
    //浅色模式
    document.body.style.setProperty("--primary-bg", "rgb(233,233,233");
    document.body.style.setProperty("--font-fg", "#000");
    document.body.style.setProperty("--card-bg", "#e6e6e6");
    document.body.style.setProperty("--card-fg", "#ffffff");
    document.body.style.setProperty("--card-sd", "#c4c4c4");
    document.body.style.setProperty("--card-sf", "#ffffff");
  } else {
    // 深色
    document.body.style.setProperty("--primary-bg", "#2b2b2b");
    document.body.style.setProperty("--font-fg", "#fff");
    document.body.style.setProperty("--card-bg", "#272727");
    document.body.style.setProperty("--card-fg", "#2e2e2e");
    document.body.style.setProperty("--card-sd", "#252525");
    document.body.style.setProperty("--card-sf", "#313131");
  }
};
export default darkTheme;
