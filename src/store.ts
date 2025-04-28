/**
 * Redux Store
 * 
 * This file configures the Redux store for the application.
 */

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
// For now, we'll create empty reducers as placeholders
const userReducer = (state = null, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

const notificationReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return [...state, action.payload];
    case 'HIDE_NOTIFICATION':
      return state.filter((notification: any) => notification.id !== action.payload);
    case 'CLEAR_NOTIFICATIONS':
      return [];
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  // Add more reducers here as needed
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
