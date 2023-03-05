import React from "react";
import { formatRelativeDate } from "../helpers";

const List = ({
  data = [],
  onClick,
  hasIndex = false,
  hasDate = false,
  onRemove,
}) => {
  const handleClickRemove = (event, keyword) => {
    // 이벤트 버블링 방지
    event.stopPropagation();
    onRemove(keyword);
  };

  return (
    <ul className="list">
      {data.map((item, idx) => {
        return (
          <li key={item.id} onClick={() => onClick(item.keyword)}>
            {hasIndex && <span className="number">{idx + 1}</span>}
            <span>{item.keyword}</span>
            {hasDate && (
              <span className="date">{formatRelativeDate(item.date)}</span>
            )}
            {!!onRemove && (
              <button
                className="btn-remove"
                onClick={(event) => handleClickRemove(event, item.keyword)}
              ></button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
