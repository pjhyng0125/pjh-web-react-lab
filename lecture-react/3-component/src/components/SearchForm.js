import React from "react";

// props object 표현 -> 가독성 좋음
const SearchForm = ({ value, onChange, onSubmit, onReset }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleReset = () => {
    onReset();
  };

  const handleChangeInput = (e) => {
    const searchKeyword = e.target.value;
    onChange(searchKeyword);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="검색 입력!"
        autoFocus
        value={value}
        onChange={handleChangeInput}
      />
      {value.length > 0 && <button type="reset" className="btn-reset"></button>}
    </form>
  );
};

export default SearchForm;
