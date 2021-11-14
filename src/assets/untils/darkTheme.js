const darkTheme = (state) => {
  if (state) {
    //深色模式
    document.body.style.setProperty("--primary-bg", "rgb(233,233,233");
    document.body.style.setProperty("--font-fg", "#000");
    document.body.style.setProperty("--card-bg", "#e6e6e6");
    document.body.style.setProperty("--card-fg", "#ffffff");
    document.body.style.setProperty("--card-sd", "#c4c4c4");
    document.body.style.setProperty("--card-sf", "#ffffff");
  } else {
    document.body.style.setProperty("--primary-bg", "rgb(24, 24, 24)");
    document.body.style.setProperty("--font-fg", "#fff");
    document.body.style.setProperty("--card-bg", "#202020");
    document.body.style.setProperty("--card-fg", "#252525");
    document.body.style.setProperty("--card-sd", "#1b1b1b");
    document.body.style.setProperty("--card-sf", "#2b2b2b");
  }
};
export default darkTheme;
