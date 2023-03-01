import store from "./js/store.js";
import { formatRelativeDate } from "./js/helpers.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {
  constructor() {
    super();

    // React는 state로 상태 관리
    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      activeTabBtn: TabType.KEYWORD,
      keywordList: [],
      historyList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();
    this.setState({ keywordList, historyList });
  }

  handleReset() {
    // setState는 비동기로 동작, 상태 update 되는 것은 더 늦은 시점
    console.log("[handleReset]", this.state.searchKeyword);

    this.setState(
      () => {
        return { searchKeyword: "", submitted: false };
      },
      () => {
        // setState 두번째 인자 : state 변경 완료 callback
        console.log("[handleReset]", this.state.searchKeyword);
      }
    );
  }

  handleSubmit(e) {
    // 브라우저 submit 기본 동작 (서버 요청, reload) 막기
    e.preventDefault();
    console.log("[handleSubmit]", e, this.state.searchKeyword);
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    const historyList = store.getHistoryList();

    // setState는 변경된 필드만 update 관리!
    this.setState({
      searchKeyword,
      searchResult,
      historyList,
      submitted: true,
    });
  }

  // input 상태를 React Component가 관리
  // React 이벤트 핸들러 함수명 표준 : handle...
  handleChangeInput(event) {
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();

    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0 && this.state.submitted) {
      return this.handleReset();
    }

    // React Component가 제공하는 setState 함수를 통해서만 state 변경!
    this.setState({ searchKeyword });
  }

  /**
   * 하단 tab 클릭 이벤트 핸들러
   * @param {string} tabType
   */
  handleClickTab(tabType) {
    this.setState({
      activeTabBtn: tabType,
    });
  }

  /**
   * 최근 검색어
   */
  handleClickRemoveHistory(event, keyword) {
    // 이벤트 버블링 방지
    event.stopPropagation();

    store.removeHistory(keyword);
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  // setState로 변경 상태 알려주면 render 함수 호출!
  render() {
    /* 1. element 변수 (JSX 방식)
    let resetButton = null;
    
    if (this.state.searchKeyword.length > 0) {
      resetButton = <button type="reset" className="btn-reset"></button>;
    }
    */
    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색 입력!"
          autoFocus
          value={this.state.searchKeyword} // value 만 React가 관리
          onChange={(event) => this.handleChangeInput(event)}
        />
        {/* {resetButton} */}
        {/* {this.state.searchKeyword.length > 0 ? (
              <button type="reset" className="btn-reset"></button>
            ) : null // 2. 삼항 연산자
            } */}
        {
          this.state.searchKeyword.length > 0 && (
            <button type="reset" className="btn-reset"></button>
          ) // 3. 조건연산자 && (JSX는 false 무시)
        }
      </form>
    );

    const searchResult =
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map((item) => {
            return (
              // li 태그 당 유일한 식별자 key 할당 : React 가상돔 효율적 동작을 위함.
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty-box">검색 결과가 없습니다...</div>
      );

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map(({ id, keyword }, idx) => {
          return (
            <li key={id} onClick={() => this.search(keyword)}>
              <span className="number">{idx + 1}</span>
              <span>{keyword}</span>
            </li>
          );
        })}
      </ul>
    );

    const historyList = (
      <ul className="list">
        {this.state.historyList.map(({ id, keyword, date }, idx) => {
          return (
            <li key={id} onClick={() => this.search(keyword)}>
              <span>{keyword}</span>
              <span className="date">{formatRelativeDate(date)}</span>
              <button
                className="btn-remove"
                onClick={(event) =>
                  this.handleClickRemoveHistory(event, keyword)
                }
              ></button>
            </li>
          );
        })}
      </ul>
    );

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map((tabType) => {
            return (
              <li
                className={this.state.activeTabBtn === tabType ? "active" : ""}
                key={tabType}
                onClick={(event) => this.handleClickTab(tabType)}
              >
                {TabLabel[tabType]}
              </li>
            );
          })}
        </ul>
        {this.state.activeTabBtn === TabType.KEYWORD && keywordList}
        {this.state.activeTabBtn === TabType.HISTORY && historyList}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    );
  }
}

/* JSX의 속성은 camel case
const element = (
  <>
    <header>
      <h2 className="container">검색</h2>
    </header>
    <div className="container">
      <form>
        <input type="text" placeholder="검색 입력!" autoFocus />
        <button type="reset" className="btn-reset"></button>
      </form>
    </div>
  </>
);
*/

ReactDOM.render(<App />, document.querySelector("#app"));
