import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
    constructor() {
        console.log(tag, "constructor");

        // id search-form-view 인 element 찾아 this 할당
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);

        this.showResetButton(false);
        this.bindEvents();
    }

    showResetButton(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }

    bindEvents() {
        on(this.inputElement, "keyup", () => this.handleKeyup());
        this.on("submit", (event) => this.handleSubmit(event));

        // x 버튼 클릭
        on(this.resetElement, "click", () => this.handleReset());
    }

    handleKeyup() {
        const { value } = this.inputElement;
        this.showResetButton(value.length > 0);

        // 검색어 삭제 : 입력 검색어 길이 비교
        if (value.length <= 0) {
            this.handleReset();
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // browser 기본 동작 방지
        console.log(tag, "handleSubmit");
        const { value } = this.inputElement;

        // 이벤트 emit
        this.emit("@submit", { value });
    }

    handleReset() {
        console.log(tag, "handleReset");
        this.emit("@reset", true);
    }
}
