// Helper functions for working with todo items

// Standardize todo item to ensure consistent format regardless of source
export const standardizeTodoItem = (todoItem) => {
  if (!todoItem) return null;
  
  // If the item already has the correct structure, return it
  if (todoItem.id && (todoItem.item || todoItem.text)) {
    return {
      id: todoItem.id,
      // Prioritize 'item' property, fall back to 'text'
      item: todoItem.item || todoItem.text,
      completed: Boolean(todoItem.completed)
    };
  }
  
  // Return null for invalid items
  return null;
};

// Log state for debugging
export const logState = (label, state) => {
  console.log(`${label}:`, state);
  if (Array.isArray(state)) {
    console.log('Items count:', state.length);
    if (state.length > 0) {
      console.log('First item structure:', state[0]);
    }
  }
  return state;
}; 