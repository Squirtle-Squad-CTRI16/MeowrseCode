import React, { FC, useContext } from 'react';
import type { RoomsProps } from '../../../types';
import { socket } from '../../socket';
import { UserContext } from '../../userContext';
import './Rooms.scss'
/* 
  map over list of available rooms to choose from 
  this list will be rendered underneate the create user component 
*/
export const Rooms: FC<RoomsProps> = ({ activeRooms }) => {

  const {userName} = useContext(UserContext);
  const handleRoomJoin = (userName: string) => {
    socket.emit('join', userName);
  }
  return (
    <div className='room-list-container'>
      <ul>
      {activeRooms.map((room) => {
        return (
          <li key={room} onClick={() =>handleRoomJoin(userName)}>{room}</li>
        )
      })}
      </ul>
    </div>
  )
}