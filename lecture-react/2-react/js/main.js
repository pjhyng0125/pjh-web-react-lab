class App extends React.Component {
  constructor() {
    super();

    // React는 state로 상태 관리
    this.state = {
      searchKeyword: "",
    };
  }

  handleReset() {
    // setState는 비동기로 동작, 상태 update 되는 것은 더 늦은 시점
    console.log("[handleReset]", this.state.searchKeyword);

    this.setState(
      () => {
        return { searchKeyword: "" };
      },
      () => {
        // setState 실제 상태 변경 완료 callback
        console.log("[handleReset]", this.state.searchKeyword);
      }
    );
  }

  handleSubmit(e) {
    // 브라우저 submit 기본 동작 (서버 요청, reload) 막기
    e.preventDefault();
    console.log("[handleSubmit]", e, this.state.searchKeyword);
  }

  // input 상태를 React Component가 관리
  // React 이벤트 핸들러 함수명 표준 : handle...
  handleChangeInput(event) {
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();

    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    // React Component가 제공하는 setState 함수를 통해서만 state 변경!
    this.setState({ searchKeyword });
  }

  // setState로 변경 상태 알려주면 render 함수 호출!
  render() {
    /* 1. element 변수 (JSX 방식)
    let resetButton = null;

    if (this.state.searchKeyword.length > 0) {
      resetButton = <button type="reset" className="btn-reset"></button>;
    }
    */

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
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
