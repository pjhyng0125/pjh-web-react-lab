import React from "react";
import { formatRelativeDate } from "../helpers";
import store from "../Store";
import List from "./List";

export default class HistoryList extends List {
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    const data = store.getHistoryList();
    this.setState({
      data,
    });
  }

  handleClickRemoveHistory(event, keyword) {
    // 이벤트 버블링 방지
    event.stopPropagation();

    store.removeHistory(keyword);
    this.fetch();
  }

  renderItem(item) {
    return (
      <>
        <span>{item.keyword}</span>
        <span className="date">{formatRelativeDate(item.date)}</span>
        <button
          className="btn-remove"
          onClick={(event) =>
            this.handleClickRemoveHistory(event, item.keyword)
          }
        ></button>
      </>
    );
  }
}
