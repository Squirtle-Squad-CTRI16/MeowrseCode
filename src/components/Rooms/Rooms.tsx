import React, { FC } from 'react';
import type { RoomsProps } from '../../../types';
import { socket } from '../../socket';
import './Rooms.scss'
/* 
  map over list of available rooms to choose from 
  this list will be rendered underneate the create user component 
*/
const Rooms: FC<RoomsProps> = ({ activeRooms }) => {
  const handleRoomJoin = (roomName: string) => {
    socket.emit('join-room', roomName);
  }
  return (
    <div className='room-list-container'>
      <ul>
      {activeRooms.map((room) => {
        return (
          <li key={room} onClick={() =>handleRoomJoin(room)}>{room}</li>
        )
      })}
      </ul>
    </div>
  )
}

export default Rooms;