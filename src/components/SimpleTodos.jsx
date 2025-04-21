import React from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos } from "../redux/reducer";

const SimpleTodos = (props) => {
  const [inputValue, setInputValue] = React.useState("");
  
  // Ensure todos is always an array
  const todos = Array.isArray(props.todos) ? props.todos : [];
  
  console.log("SimpleTodos rendering with todos:", todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    
    props.addTodo({
      id: Date.now(),
      item: inputValue,
      completed: false,
    });
    
    setInputValue("");
  };

  return (
    <div className="p-4 bg-white/10 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">Simple Todo Test</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-white/20 text-white"
          placeholder="Add a simple todo..."
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-primary rounded text-white"
        >
          Add
        </button>
      </form>
      
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex justify-between items-center bg-white/5 p-3 rounded"
          >
            <span className={todo.completed ? "line-through opacity-60" : ""}>
              {todo.item}
            </span>
            <button
              onClick={() => props.removeTodo(todo.id)}
              className="px-3 py-1 bg-red-500/70 rounded text-white text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="text-center text-white/50 py-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("SimpleTodos mapStateToProps:", state);
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTodos); 