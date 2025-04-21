import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

// Create store with basic configuration
const store = configureStore({
  reducer: reducer,
  devTools: true // Ensure Redux DevTools are enabled
});

// Log initial state for debugging
console.log('Initial Redux State:', store.getState());

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  console.log('Redux State Changed:', state);
  console.log('Todos count:', state.length);
});

export default store;
