import { createSlice } from "@reduxjs/toolkit";

// Initialize with empty array
const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adding todos
    addTodos: (state, action) => {
      console.log("Adding todo in reducer:", action.payload);
      state.push(action.payload);
      return state; // Explicitly return the state
    },
    // Remove todos
    removeTodos: (state, action) => {
      console.log("Removing todo in reducer:", action.payload);
      return state.filter((item) => item.id !== action.payload);
    },
    // Update todos
    updateTodos: (state, action) => {
      console.log("Updating todo in reducer:", action.payload);
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
    },
    // Toggle completed status
    completeTodos: (state, action) => {
      console.log("Completing todo in reducer:", action.payload);
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
