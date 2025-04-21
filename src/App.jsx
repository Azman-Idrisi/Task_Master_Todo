import React from 'react';
import Todos from './components/Todos';
import DisplayTodos from './components/DisplayTodos';

function App() {
  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 animate-fade-in">
            Task Master
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-8 animate-fade-in delay-100">
            Stay organized and boost your productivity with our elegant task management solution
          </p>
        </header>
        
        <div className="space-y-8">
          <Todos />
          <DisplayTodos />
        </div>
        
        <footer className="mt-14 text-center text-white/40 text-sm">
          <p className="mb-1">Beautifully designed todo app with Tailwind CSS</p>
          <div className="flex justify-center space-x-3 mt-2">
            <div className="h-1 w-16 bg-purple-500/30 rounded-full"></div>
            <div className="h-1 w-4 bg-purple-500/60 rounded-full"></div>
            <div className="h-1 w-2 bg-purple-500/90 rounded-full"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App; 