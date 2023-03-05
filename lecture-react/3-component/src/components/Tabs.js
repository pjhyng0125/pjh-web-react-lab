import React from "react";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

const Tabs = ({ activeTabBtn, onChange }) => {
  return (
    <ul className="tabs">
      {Object.values(TabType).map((tabType) => {
        return (
          <li
            className={activeTabBtn === tabType ? "active" : ""}
            key={tabType}
            onClick={() => onChange(tabType)}
          >
            {TabLabel[tabType]}
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
