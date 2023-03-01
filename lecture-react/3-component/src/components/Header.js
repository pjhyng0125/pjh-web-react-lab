import React from "react";
// JSX 문법 사용 시, 반드시! React import 필수

// 함수형 component : JSX 형태로 React component 반환
// props는 객체 모양으로 component에 전달
const Header = (props) => {
  return (
    <header>
      <h2 className="container">{props.title}</h2>
    </header>
  );
};

export default Header;
