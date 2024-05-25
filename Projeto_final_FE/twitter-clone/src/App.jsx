import React from 'react';
import './App.css';
import Users from './components/user';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
      </header>
      <main>
        <Users />
      </main>
    </div>
  );
}

export default App;