import React, { FC, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './CreateUser.scss';
import { socket } from '../../socket';
import { Rooms } from '../Rooms/Rooms';
import { UserContext } from '../../userContext';
import type { CreateUserProps } from '../../../types';

export const CreateUser: FC<CreateUserProps> = ({ activeRooms }) => {
  const { userName, setUserName } = useContext(UserContext);
  // const [openRooms, setOpenRooms] = useState<string[]>([]);
  const nav = useNavigate();
  const handleClick = () => {
    socket.emit('join', userName);
    setTimeout(() => nav('/cheezeburger'), 1500);
    // toggleRooms(userName);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div>
      <div className="title">Meowrse Code</div>
      <div className='create-user-container'>
        <div className="cat-ears">
          <div className="right"/>
          <div className="left"/>
        </div>
        <input
          placeholder='username'
          type='text'
          value={userName}
          onChange={handleUserNameChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleClick}>I wanna meow at strangers please</button>
      </div>
      <div className='room-list-container'>
        <Rooms activeRooms={activeRooms} />
      </div>
    </div>
  );
};
