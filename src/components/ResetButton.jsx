import React from 'react';
import { connect } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../redux/reducer';

const ResetButton = ({ dispatch }) => {
  const handleReset = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Log the action
    console.log('State reset requested, localStorage cleared');
    
    // Force reload the page
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className="px-4 py-2 bg-red-600/70 hover:bg-red-700/70 text-white rounded-md text-sm font-medium mt-4"
    >
      Reset App State
    </button>
  );
};

export default connect()(ResetButton); 