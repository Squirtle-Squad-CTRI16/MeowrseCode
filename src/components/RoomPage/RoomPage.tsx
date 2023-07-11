import React, { FC, useState } from 'react';
import deepMeow from '../../assets/deep-ass-meow.mp3';
import { socket } from '../../socket';
import { MeowButton } from '../MeowButton/MeowButton';
import { UserCard } from '../UserCard/UserCard';

export const RoomPage: FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  const meow = new Audio(deepMeow);
  //when 'heard' is received
  socket.on('heard', (username) => {
    meow.play();
  })

  socket.on('userList', (usersResponse) => {
    setUsers(usersResponse);
  })

  return (
    <div>
      <div className="users-in-room">{users.map(user => (
        <UserCard userID={socket.id}/> 
        ))}</div>
      <MeowButton userID={socket.id}/>
    </div>
  )
}
