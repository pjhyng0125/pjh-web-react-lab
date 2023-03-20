import MainController from "./controllers/MainController.js";

document.addEventListener("DOMContentLoaded", () => {
  new MainController();
  console.log("[app.js] called!");
});

/* loader 예제
import "./app.css";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});
*/
