import React from "react";
import store from "../Store";
import List from "./List";

export default class KeywordList extends React.Component {
  constructor() {
    super();

    this.state = {
      keywordList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({
      keywordList,
    });
  }

  render() {
    const { onClick } = this.props;
    const { keywordList } = this.state;
    return <List data={keywordList} onClick={onClick} hasIndex={true} />;
  }
}
