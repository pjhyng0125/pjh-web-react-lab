// import MainController from "./controllers/MainController.js";
import axios from "axios";
import "./app.css";

// app.scss 사스 파일을 불러올 수 있도록 웹팩 구성 추가 필요
// import "./app.scss";

document.addEventListener("DOMContentLoaded", async () => {
  // new MainController();
  // console.log("[app.js] called!");

  const res = await axios.get("/api/users");
  console.log(res);

  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

console.log(`[app.js] ${process.env.NODE_ENV}`); // "development"

// eslint-disable-next-line no-console
// console.log(`[app.js] ${NUM}`); // 7
// console.log(`[app.js] ${STR}`); // 1+1
// console.log(`[app.js] ${api.domain}`); // www.devpjh.com

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
// const alert = (msg) => window.alert(msg);
// alert("babel 테스트");

// prettier 테스트
// var foo = "";
// console.log();

// hot loading 테스트
if (module.hot) {
  console.log("핫 모듈 켜짐!");

  // 특정 파일 변경 감지
  module.hot.accept("./app", () => {
    console.log("app 모듈 변경됨!");
  });
}
