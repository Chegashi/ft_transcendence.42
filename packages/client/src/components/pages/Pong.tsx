import React from 'react';
import TempoNav from '../TempoNav/NavbarGame';
import Game from '../Game/Game'

const style = {
  width: '600px',
  height: '400px',
}

const Pong = () => {
  return (
    <div>
      <TempoNav/>
      <div style = {style}>
        <Game width="600" height="400" />
      </div> 
    </div>
  );
};

export default Pong;