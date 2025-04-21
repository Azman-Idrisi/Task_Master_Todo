import React, { useRef, useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiClock, FiMoreVertical } from "react-icons/fi";

const TodoItem = (props) => {
  // Log the item received
  console.log("TodoItem received:", props.item);
  
  // If item is not provided or invalid, don't render anything
  if (!props.item || typeof props.item !== 'object' || !props.item.id) {
    console.error('Invalid todo item provided to TodoItem:', props.item);
    return null;
  }

  const { item, updateTodo, removeTodo, completeTodo } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  
  // For displaying the text in input, handle both item and text properties
  const displayText = item.item || item.text || '';

  useEffect(() => {
    // Add event listener to close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemove = () => {
    setIsAnimating(true);
    // Add a small delay before actually removing to allow animation to show
    setTimeout(() => {
      removeTodo(item.id);
    }, 300);
    setShowMenu(false);
  };

  const handleComplete = () => {
    setIsAnimating(true);
    setTimeout(() => {
      completeTodo(item.id);
      setIsAnimating(false);
    }, 300);
    setShowMenu(false);
  };

  const enableEdit = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
    setShowMenu(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value.trim() === "") {
        // Add shake animation class
        inputRef.current.classList.add('animate-shake');
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.classList.remove('animate-shake');
          }
        }, 500);
        return;
      }
      
      updateTodo({ id: item.id, item: inputRef.current.value });
      inputRef.current.disabled = true;
      
      // Add pulse animation
      inputRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.classList.remove('animate-pulse');
        }
      }, 500);
    }
  };

  // Calculate a gradient based on the task id for visual variety
  const getGradientColor = () => {
    const colors = [
      'from-purple-500/5 to-indigo-500/5',
      'from-blue-500/5 to-cyan-500/5',
      'from-green-500/5 to-emerald-500/5',
      'from-orange-500/5 to-amber-500/5',
      'from-pink-500/5 to-rose-500/5'
    ];
    
    const index = typeof item.id === 'number' ? item.id % colors.length : 0;
    return colors[index];
  };

  return (
    <div 
      className={`group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 animate-fade-in ${
        isAnimating ? 'opacity-0 translate-y-[-10px] transition-all duration-300' : ''
      } ${
        item.completed 
          ? "bg-white/5 border border-white/5" 
          : `bg-gradient-to-br ${getGradientColor()} border border-white/10 hover:border-white/20`
      }`}
    >
      {item.completed && (
        <div className="absolute top-4 right-4 bg-secondary/90 text-xs px-2 py-1 rounded-full text-white font-medium z-10 flex items-center gap-1">
          <FiCheck className="text-xs" />
          <span>Completed</span>
        </div>
      )}
      
      <div className="p-5 relative">
        {/* Options menu */}
        <div className="absolute top-2 right-2 z-20" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white/90"
          >
            <FiMoreVertical />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 w-36 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-1 overflow-hidden z-30 animate-fade-in">
              <button
                onClick={enableEdit}
                className="w-full px-3 py-2 hover:bg-white/5 text-left text-sm flex items-center gap-2 text-white/80"
              >
                <FiEdit2 className="text-primary-light" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleComplete}
                className="w-full px-3 py-2 hover:bg-white/5 text-left text-sm flex items-center gap-2 text-white/80"
              >
                {item.completed ? (
                  <>
                    <FiClock className="text-primary-light" />
                    <span>Mark undone</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="text-secondary" />
                    <span>Complete</span>
                  </>
                )}
              </button>
              <div className="border-t border-white/5 my-1"></div>
              <button
                onClick={handleRemove}
                className="w-full px-3 py-2 hover:bg-red-900/20 text-left text-sm flex items-center gap-2 text-red-300"
              >
                <FiTrash2 className="text-red-400" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-4">
          {/* Completion checkbox */}
          <button
            onClick={handleComplete}
            className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              item.completed 
                ? "bg-secondary text-white" 
                : "border-2 border-white/30 hover:border-primary"
            }`}
          >
            {item.completed && <FiCheck size={14} />}
          </button>
          
          <div className="flex-1">
            {/* Todo text */}
            <input
              ref={inputRef}
              type="text"
              defaultValue={displayText}
              disabled
              onKeyPress={handleKeyPress}
              className={`w-full bg-transparent border-none outline-none transition-all duration-300 font-medium ${
                item.completed 
                  ? "text-white/50 line-through" 
                  : "text-white focus:text-primary-light"
              }`}
            />
            
            {/* Action buttons - visible on hover */}
            <div className="flex justify-end mt-3 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={enableEdit}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={handleComplete}
                className={`p-2 rounded-lg text-white/70 hover:text-white transition-colors ${
                  item.completed
                    ? "bg-blue-500/10 hover:bg-blue-500/20"
                    : "bg-green-500/10 hover:bg-green-500/20"
                }`}
              >
                {item.completed ? <FiClock size={16} /> : <FiCheck size={16} />}
              </button>
              <button
                onClick={handleRemove}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 