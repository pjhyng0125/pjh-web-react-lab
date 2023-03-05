import React from "react";

const SearchResult = ({ data = [] }) => {
  if (data.length <= 0) {
    return <div className="empty-box">검색 결과 없음...</div>;
  }
  return (
    <ul className="result">
      {data.map((item) => {
        return (
          // li 태그 당 유일한 식별자 key 할당 : React 가상돔 효율적 동작을 위함.
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResult;
