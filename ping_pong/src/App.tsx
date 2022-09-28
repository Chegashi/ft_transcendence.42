import React from 'react';
import './App.css';
import Game from './game'

function App() {
  React.useState(0);
  // let height:number = √
  return (
    <div className="App">
      <header className="App-header">
      {<Game />}
      </header> 
    </div>
  );
}

export default App;
