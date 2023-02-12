import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";
import KeywordListView from "./views/KeywordListView.js";
import HistoryListView from "./views/HistoryListView.js";

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
    keywordListView: new KeywordListView(),
    historyListView: new HistoryListView(),
  };

  // controller
  new Controller(store, views);
}
