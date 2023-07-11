import React, { FC } from 'react';
import deepMeow from '../../assets/deep-ass-meow.mp3';
import { socket } from '../../socket'
import { MeowButton } from '../MeowButton/MeowButton';

const RoomPage: FC = () => {
const meow = new Audio(deepMeow);
  //when 'heard' is received, 
  socket.on('heard', (username) => {
    meow.play();
  })

  return (
    <div>
      <div className="users-in-room">{/* map of all UserCards */}</div>
      < MeowButton userID={socket.id}/>
    </div>
  )
}

export default RoomPage;