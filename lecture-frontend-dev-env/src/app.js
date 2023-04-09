import MainController from "./controllers/MainController.js";
// import "./main.css";

// app.scss 사스 파일을 불러올 수 있도록 웹팩 구성 추가 필요
import "./app.scss";

document.addEventListener("DOMContentLoaded", () => {
  new MainController();
  console.log("[app.js] called!");
});

console.log(`[app.js] ${process.env.NODE_ENV}`); // "development"

// eslint-disable-next-line no-console
console.log(`[app.js] ${NUM}`); // 7
console.log(`[app.js] ${STR}`); // 1+1
console.log(`[app.js] ${api.domain}`); // www.devpjh.com

/* loader 예제
import "./app.css";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});
*/

// babel 테스트
const alert = (msg) => window.alert(msg);
alert("babel 테스트");
