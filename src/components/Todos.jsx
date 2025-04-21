import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { FiPlus } from "react-icons/fi";
import { logState } from "../utils";

const mapStateToProps = (state) => {
  const safeState = logState("Todos mapStateToProps", state);
  return {
    todos: safeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  
  // Ensure todos is always an array
  const todos = Array.isArray(props.todos) ? props.todos : [];
  
  console.log("Todos rendering with todos:", todos);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (todo.trim() === "") {
      // Add shake animation to the form
      if (formRef.current) {
        formRef.current.classList.add('animate-shake');
        setTimeout(() => {
          formRef.current?.classList.remove('animate-shake');
        }, 500);
      }
      return;
    }

    // Set submitting state for animation
    setIsSubmitting(true);

    // Create a new todo item
    const newTodo = {
      id: Date.now(),
      item: todo,
      completed: false,
    };
    
    console.log("Adding new todo:", newTodo);
    props.addTodo(newTodo);
    setTodo("");
    
    // Reset submitting state after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="mb-10 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white/90">
          Create New Task
        </h2>
        <div className="text-sm text-white/50 font-medium">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
        </div>
      </div>
      
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className={`relative ${isSubmitting ? 'animate-pulse' : ''}`}
      >
        <div className="relative flex rounded-xl overflow-hidden transition-all duration-300 shadow-custom">
          <input
            ref={inputRef}
            type="text"
            onChange={handleChange}
            value={todo}
            placeholder="What needs to be done?"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
              isInputFocused ? 'border-primary/50' : 'border-white/20'
            }`}
          />
          
          <button
            type="submit"
            className="px-5 py-4 bg-primary hover:bg-primary-dark text-white transition-all duration-200 flex items-center gap-2 font-medium hover:scale-[1.02]"
          >
            <FiPlus className="text-lg" /> 
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-3 px-2 text-xs text-white/40">
          <p>Press Enter to add task</p>
          <p>Task will be added to your list</p>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos); 