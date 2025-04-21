import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem.jsx";
import { FiList, FiCheckCircle, FiGrid, FiClipboard } from "react-icons/fi";
import { logState } from "../utils";

const mapStateToProps = (state) => {
  const safeState = logState("DisplayTodos mapStateToProps", state);
  return {
    todos: safeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  
  // Ensure todos is always an array
  const todos = Array.isArray(props.todos) ? props.todos : [];
  
  console.log("DisplayTodos rendering with todos:", todos);

  const renderTodos = () => {
    console.log("Rendering todos:", todos, "Sort:", sort);
    
    if (todos.length === 0) {
      return (
        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 text-white/70 animate-fade-in">
          <div className="rounded-full bg-gray-800/50 p-6 mb-6">
            <FiClipboard className="w-16 h-16 opacity-30" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
          <p className="text-white/50 text-center max-w-xs">
            Add a new task above to get started on your productivity journey
          </p>
          <button 
            onClick={() => document.querySelector('input').focus()}
            className="mt-6 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary-light rounded-lg transition-all duration-200 hover:scale-105"
          >
            Start adding tasks
          </button>
        </div>
      );
    }

    if (sort === "active") {
      const activeTodos = todos.filter(item => !item.completed);
      console.log("Active todos:", activeTodos);
      
      if (activeTodos.length === 0) {
        return (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 text-white/70 animate-fade-in">
            <div className="rounded-full bg-secondary/10 p-4 mb-4">
              <FiCheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-1">All caught up!</h3>
            <p className="text-white/50 text-center max-w-xs">
              You have completed all of your tasks
            </p>
          </div>
        );
      }
      
      return activeTodos.map((item, index) => (
        <div key={item.id} className={`animate-fade-in delay-${index % 3}00`}>
          <TodoItem
            item={item}
            removeTodo={props.removeTodo}
            updateTodo={props.updateTodo}
            completeTodo={props.completeTodo}
          />
        </div>
      ));
    } else if (sort === "completed") {
      const completedTodos = todos.filter(item => item.completed);
      console.log("Completed todos:", completedTodos);
      
      if (completedTodos.length === 0) {
        return (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 text-white/70 animate-fade-in">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <FiList className="w-10 h-10 text-primary-light" />
            </div>
            <h3 className="text-xl font-bold mb-1">Nothing completed yet</h3>
            <p className="text-white/50 text-center max-w-xs">
              Complete some tasks to see them here
            </p>
          </div>
        );
      }
      
      return completedTodos.map((item, index) => (
        <div key={item.id} className={`animate-fade-in delay-${index % 3}00`}>
          <TodoItem
            item={item}
            removeTodo={props.removeTodo}
            updateTodo={props.updateTodo}
            completeTodo={props.completeTodo}
          />
        </div>
      ));
    } else {
      console.log("All todos:", todos);
      return todos.map((item, index) => (
        <div key={item.id} className={`animate-fade-in delay-${index % 3}00`}>
          <TodoItem
            item={item}
            removeTodo={props.removeTodo}
            updateTodo={props.updateTodo}
            completeTodo={props.completeTodo}
          />
        </div>
      ));
    }
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white/90 animate-slide-in">
          Your Tasks
        </h2>
        {todos.length > 0 && (
          <div className="text-sm text-white/50 flex items-center gap-2 animate-slide-in">
            <span className="text-primary-light font-medium">{activeCount}</span> active / 
            <span className="text-secondary font-medium">{completedCount}</span> completed
          </div>
        )}
      </div>
      
      {/* Always show filter buttons regardless of todos length */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSort("active")}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 animate-fade-in delay-100 ${
            sort === "active"
              ? "bg-primary text-white shadow-md"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          }`}
        >
          <FiList className={sort === "active" ? "text-white" : "text-primary-light"} />
          Active
          {activeCount > 0 && (
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
              sort === "active" ? "bg-white/20" : "bg-primary/20"
            }`}>
              {activeCount}
            </span>
          )}
        </button>
        
        <button
          onClick={() => setSort("completed")}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 animate-fade-in delay-200 ${
            sort === "completed"
              ? "bg-secondary text-white shadow-md"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          }`}
        >
          <FiCheckCircle className={sort === "completed" ? "text-white" : "text-secondary"} />
          Completed
          {completedCount > 0 && (
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
              sort === "completed" ? "bg-white/20" : "bg-secondary/20"
            }`}>
              {completedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setSort("all")}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 animate-fade-in delay-300 ${
            sort === "all"
              ? "bg-white/20 text-white shadow-md"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          }`}
        >
          <FiGrid className={sort === "all" ? "text-white" : "text-white/50"} />
          All
          {todos.length > 0 && (
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
              sort === "all" ? "bg-white/20" : "bg-white/10"
            }`}>
              {todos.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderTodos()}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos); 