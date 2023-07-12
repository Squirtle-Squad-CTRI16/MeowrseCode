import React, { FC, useState } from 'react';
import deepMeow from '../../assets/deep-ass-meow.mp3';
import { socket } from '../../socket';
import { MeowButton } from '../MeowButton/MeowButton';
import { UserCard } from '../UserCard/UserCard';
import { UserList } from '../../../types';
import catbg from '../../assets/cat-relaxing.gif'
import './RoomPage.scss';

export const RoomPage: FC = () => {
  const [users, setUsers] = useState<UserList[]>([]);
  
  //when 'heard' is received,
  socket.on('heard', (id) => {
    
    const meow = new Audio(deepMeow);
    meow.volume = 0.05;
    meow.play();
    const meower = document.getElementById(id);
    console.log(meower);
    meower?.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      {
        duration: 1000, // 1 second animation
        iterations: 1, // play animation once
        easing: 'linear', // linear animation timing
        fill: 'forwards', // maintain the final state after animation
      }
    );
  });

  socket.on('userList', (usersResponse: UserList[]) => {
    console.log(usersResponse);
    setUsers(usersResponse);
  });

  return (
    <div
      className='room-page-wrapper'
      style={{ backgroundImage: `url(${catbg})` }}
    >
      <h2 className='cat-count'>sponsored by Jeeny, Bractlet, and Codesmith</h2>
      <div className='users-in-room'>
        {users.map((user) => (
          <UserCard id={user.id} name={user.name} img={user.img} />
        ))}
      </div>
      <MeowButton userID={socket.id} />
    </div>
  );
};
