import "./TodoItem.css";

const TodoItem = () => {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div className="content">TODO...</div>
      <div className="date">Date</div>
      <button>삭제</button>
    </div>
  );
};

export default TodoItem;
