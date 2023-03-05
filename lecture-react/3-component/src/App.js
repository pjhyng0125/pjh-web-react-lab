import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import store from "./Store.js";
import Tabs, { TabType } from "./components/Tabs.js";
import KeywordList from "./components/KeywordList.js";
import HistoryList from "./components/HistoryList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      activeTabBtn: TabType.KEYWORD,
    };
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);

    this.setState({
      searchKeyword,
      searchResult,
      submitted: true,
    });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      submitted: false,
      searchResult: [],
    });
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword <= 0) {
      this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  render() {
    const { searchKeyword, searchResult, submitted, activeTabBtn } = this.state;
    return (
      <>
        <Header title="검색" />
        <div className="container">
          <SearchForm
            value={searchKeyword}
            onChange={(value) => this.handleChangeInput(value)}
            onSubmit={() => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />
          <div className="content">
            {submitted ? (
              <SearchResult data={searchResult} />
            ) : (
              <>
                <Tabs
                  activeTabBtn={activeTabBtn}
                  onChange={(activeTabBtn) => {
                    this.setState({ activeTabBtn });
                  }}
                />
                {activeTabBtn === TabType.KEYWORD && (
                  <KeywordList onClick={(keyword) => this.search(keyword)} />
                )}
                {activeTabBtn === TabType.HISTORY && (
                  <HistoryList onClick={(keyword) => this.search(keyword)} />
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
