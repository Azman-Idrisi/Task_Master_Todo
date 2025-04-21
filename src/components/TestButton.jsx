import React from 'react';
import { connect } from 'react-redux';
import { addTodos } from '../redux/reducer';

const TestButton = ({ dispatch }) => {
  const handleAddTestTodo = () => {
    dispatch(addTodos({
      id: Date.now(),
      item: 'Test Todo Item ' + Date.now(),
      completed: false,
    }));
  };

  return (
    <button
      onClick={handleAddTestTodo}
      className="px-4 py-2 bg-green-600/70 hover:bg-green-700/70 text-white rounded-md text-sm font-medium mx-2"
    >
      Add Test Todo
    </button>
  );
};

export default connect()(TestButton); 