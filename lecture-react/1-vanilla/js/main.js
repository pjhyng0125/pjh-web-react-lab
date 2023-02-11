import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, "main");

  // MVC 모델 적용

  // model
  const store = new Store(storage);

  // view
  const views = {
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
    tabView: new TabView(),
  };

  // controller
  new Controller(store, views);
}
