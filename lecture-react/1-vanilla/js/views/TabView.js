import { delegate, qs, qsAll } from "../helpers.js";
import View from "./View.js";

const tag = "[TabView]";

export const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY',
};

const TabLabel = {
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근 검색어',
};

export default class TabView extends View {
    constructor() {
        super(qs('#tab-view'));
        this.template = new Template();

        // tab> li 클릭 이벤트 바인딩
        this.bindTabEvent();
    }

    bindTabEvent() {
        // tab-view> li> 클릭 이벤트 바인딩
        delegate(this.element, "click", "li", event => this.handleTabClick(event));
    }

    handleTabClick(event) {
        console.log(tag, "handleTabClick", event.target);

        // dataset.tab : data-tab 속성 get
        const value = event.target.dataset.tab;
        this.emit('@change', { value });
    }

    show(selectedTab) {
        this.element.innerHTML = this.template.getTableList();

        qsAll("li", this.element).forEach(li => {
            li.className = li.dataset.tab === selectedTab ? "active" : "";
        })

        super.show()
    }
}

class Template {
    getTableList() {
        return `
            <ul class="tabs">
                ${Object.values(TabType)
                    .map((tabType) => ({ tabType, tabLabel: TabLabel[tabType]}))    // 1. json object 요소 배열
                    .map(this._getTab)                                              // 2. html 형식 변환
                    .join("")                                                       // 3. 배열 내 요소를 하나의 문자열로 만들기
                }
            </ul>
        `;
    }

    _getTab({ tabType, tabLabel }) {
        return `
            <li data-tab="${tabType}">
                ${tabLabel}
            </li>
        `;
    }
}

