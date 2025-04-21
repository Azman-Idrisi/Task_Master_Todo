import React, { useState } from 'react';

function BasicTodo() {
  // Start with sample todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [input, setInput] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInput('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Basic Todo App</h1>
      
      {/* Input form */}
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg bg-white/20 text-white placeholder-white/60 outline-none"
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white rounded-r-lg"
        >
          Add
        </button>
      </div>
      
      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 h-5 w-5 accent-purple-600"
              />
              <span className={`text-white ${todo.completed ? 'line-through opacity-60' : ''}`}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-300 px-2 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="text-center text-white/50 py-4">No tasks yet. Add one above!</p>
      )}
      
      {todos.length > 0 && (
        <div className="mt-4 text-sm text-white/70">
          <p>{todos.filter(todo => !todo.completed).length} tasks remaining</p>
        </div>
      )}
    </div>
  );
}

export default BasicTodo; 