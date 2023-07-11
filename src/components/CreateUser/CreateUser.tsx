import React, { FC, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './CreateUser.scss';
import { socket } from '../../socket'
import { Rooms } from '../Rooms/Rooms';
import { UserContext } from '../../userContext';
import type { CreateUserProps } from '../../../types';


export const CreateUser: FC<CreateUserProps> = ({activeRooms}) => {

const {userName, setUserName} = useContext(UserContext);
// const [openRooms, setOpenRooms] = useState<string[]>([]);
const nav = useNavigate();
const handleClick = () => { 
  socket.emit('join', userName);
  nav('/board');
  // toggleRooms(userName);
};

const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
}

// const toggleRooms = (userName: string) => {
//   socket.emit('get-open-rooms', userName, (openRooms: string[]) => {
//     // backend sends response with array of rooms that 
//     // do not already have a user with this username 
//     setOpenRooms(openRooms);
//   })
// }

    return (
      <div>
        <div className="create-user-container">
            <input className='username-input' type="text" value={userName} onChange={handleUserNameChange}/>
            <button onClick={handleClick}>I wanna meow at strangers please</button>
        </div>
        <div className='room-list-container'>
          <Rooms activeRooms={activeRooms} />
        </div>

      </div>
    )
}
