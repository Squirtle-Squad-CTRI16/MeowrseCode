import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider, UserContext } from './userContext';
import Rooms from './components/Rooms/Rooms'
import RoomPage from './components/RoomPage/RoomPage';
import CreateUser from './components/CreateUser/CreateUser';
import { socket } from './socket';

const App: FC = () => {
  const [activeRooms, setActiveRooms] = useState<string[]>([]);
  useEffect(() => {
    socket.on('active-rooms', (rooms: string[]) => {
      setActiveRooms(rooms);
    });

    return () => {
      socket.off('active-rooms');
    }
  }, []);

  return (
    <UserProvider>
      <Routes>
        <Route path={'/'} element={<><CreateUser activeRooms={activeRooms}/><Rooms activeRooms={activeRooms}/></>} />
        <Route path={'/board'} element={<RoomPage/>} />
      </Routes>
    </UserProvider>
  )
};
export default App;
