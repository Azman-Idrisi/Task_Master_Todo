import React from 'react';
import { connect } from 'react-redux';

const DebugState = ({ state }) => {
  return (
    <div className="mt-8 p-4 bg-red-900/20 rounded-lg text-sm">
      <h3 className="text-white font-bold mb-2">Debug - Redux State:</h3>
      <pre className="whitespace-pre-wrap overflow-auto max-h-40 text-white/70 text-xs">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(DebugState); 