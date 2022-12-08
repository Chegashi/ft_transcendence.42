// import React from 'react';
import Game from './Game/Game';
import GameRooms from './Game/GameRooms';
import './App.css';
import { useEffect, useState } from 'react';
// import socketService from './Game/socketService';

function App() {
  const [text, setText] = useState('good')
  useEffect(() => {
    return () => {
      // alert('warning');
      setText('LEAVING')
      console.log('LEAVING');
    }

  }, [])
  // const connectSocket = async () => {
  //   socketService
  //     .connect("http://localhost:4000")
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     });
  // };

  // useEffect(() => {
  //   connectSocket();
  //   console.log('ENTERED2');
  //   console.log(socketService.socket);
  // }, []);

  return (
    <div>
        <p>{text}</p>
        <GameRooms/>
        <Game width={600} height={400} />
    </div>
  );
}

export default App;
