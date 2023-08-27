import React from 'react';
import './App.css';
import Weather from './Weather';
import TodoList from './TodoList';

const App: React.FC = () => {

  const date = new Date()
  const options : {} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const datestr = date.toLocaleDateString('ko-KR', options)

  return (
    <div className="app">
      <h1>나만의 다이어리 <span className="date">{datestr}</span></h1>
      <Weather />
      <TodoList />
    </div>
  );
};

export default App;
