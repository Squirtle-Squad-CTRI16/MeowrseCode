import React, { FC, useState } from 'react';
import deepMeow from '../../assets/deep-ass-meow.mp3';
import { socket } from '../../socket';
import { MeowButton } from '../MeowButton/MeowButton';
import { UserCard } from '../UserCard/UserCard';
import { UserList } from '../../../types';

export const RoomPage: FC = () => {
  const [users, setUsers] = useState<UserList[]>([]);

  const meow = new Audio(deepMeow);
  //when 'heard' is received, 
  socket.on('heard', (username) => {
    meow.play();
  })

  socket.on('userList', (usersResponse:UserList[]) => {
    console.log(usersResponse)
    setUsers(usersResponse);
  })

  return (
    <div>
      <div className="users-in-room">{users.map(user => (
        <UserCard id={user.id} name={user.name} img={user.img}/> 
        ))}</div>
      <MeowButton userID={socket.id}/>
    </div>
  )
}
