// 全局初始化样式代码
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

body::-webkit-scrollbar{
        width: 8px;
        height: 8px;
        background: linear-gradient(to bottom, var(--card-bg), var(--card-fg));;
    }
 
    /*定义滚动条轨道 内阴影+圆角*/
    body::-webkit-scrollbar-track
    {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
        border-radius: 10px;
        background: linear-gradient(to bottom, var(--card-bg), var(--card-fg));
        -webkit-box-shadow:  5px 5px 2px var(--card-sd),
                            -5px -5px -2px var(--card-sf);
    }
    
    /*定义滑块 内阴影+圆角*/
    body::-webkit-scrollbar-thumb
    {
        height: 10px;
        border-radius: 10px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
        -webkit-box-shadow:  5px 5px 2px var(--card-sd),
                            -5px -5px -2px var(--card-sf);
        background-color: white;
        cursor: pointer;
    }
/* 白色 */
/* dark 为false的时候 */
/* ${(props) => (props.dark ? "#000" : "rgb(233,233,233)")} */
:root {
  --primary-bg: ${(props) =>
    props.dark ? "#2b2b2b" : "rgb(233,233,233)"} ; // 全局背景色，在下面配置
  --font-fg: ${(props) => (props.dark ? "#fff" : "#000")};  // 字体颜色
  --card-bg: ${(props) =>
    props.dark ? "#272727" : "#e6e6e6"}; // 组件渐变第一个颜色
  --card-fg: ${(props) =>
    props.dark ? "#2e2e2e" : "#ffffff"}; // 组件渐变第二个颜色
  --card-sd: ${(props) =>
    props.dark ? "#252525" : "#c4c4c4"}; // 卡片阴影第一个颜色
  --card-sf: ${(props) =>
    props.dark ? "#313131" : "#ffffff"}; // 卡片阴影第二个颜色
  --hover-fg: ${(props) => (props.dark ? "#fff" : "#000")};
  --primary-btn-bg: #000; // 
  --primary-btn-fg: #fff;
  --secondary-btn-bg: #ff0000;
  --secondary-btn-fg: #ffff00;
}
@media (prefers-color-scheme: dark) {
    :root {
        --primary-bg: #2b2b2b; // 全局背景色，在下面配置
        --font-fg: #fff;  // 字体颜色
        --card-bg: #2e2e2e; // 组件渐变第一个颜色
        --card-fg: #373737; // 组件渐变第二个颜色
        --card-sd: #2b2b2b; // 卡片阴影第一个颜色
        --card-sf: #3b3b3b; // 卡片阴影第二个颜色
        --primary-btn-bg: #000; // 
        --primary-btn-fg: #fff;
        --secondary-btn-bg: #ff0000;
        --secondary-btn-fg: #ffff00;
    }
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    background: var(--primary-bg);
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

`;
