// 全局初始化样式代码
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
/* 白色 */
:root {
  --primary-bg: rgb(233,233,233); // 全局背景色，在下面配置
  --font-fg: #000;  // 字体颜色
  --card-bg: #e6e6e6; // 组件渐变第一个颜色
  --card-fg: #ffffff; // 组件渐变第二个颜色
  --card-sd: #c4c4c4; // 卡片阴影第一个颜色
  --card-sf: #ffffff; // 卡片阴影第二个颜色
  --primary-btn-bg: #000; // 
  --primary-btn-fg: #fff;
  --secondary-btn-bg: #ff0000;
  --secondary-btn-fg: #ffff00;
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
