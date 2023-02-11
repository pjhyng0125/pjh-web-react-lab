const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    // custom event 수신
    this.searchFormView
      .on("@submit", event => this.search(event.detail.value))
      .on("@reset", () => this.reset());

      // this.tabView.on('@change', event => console.log(event));
      this.tabView.on('@change', event => this.changeTab(event.detail.value))
  }

  search(searchKeyword) {
    console.log(tag, "search", searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset() {
    console.log(tag, "reset");

    // X 버튼 클릭 시, 검색결과 초기화
    this.store.searchKeyword = '';
    this.store.searchResult = [];
    this.render();
  }

  changeTab(tab) {
    console.log(tag, "changeTab", tab);
    this.store.selectedTab = tab;
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }
    
    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
