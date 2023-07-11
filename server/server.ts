import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:'*'}}); // allow cors from anywhere, can change to just client later 

app.use(express.json());

app.use(express.static(path.join(__dirname, '../src')));

const userList: Record<string, string>[] = [];

io.on('connection', socket => {
  console.log('Connected to server!');
  // user connects
  socket.on('join', (name: string)=>{
    const newObj:Record<string, string> = {}
    newObj[socket.id] = name;
    //add socket.id and name to our new object array
    userList.push(newObj)
    console.log('new user!');
    io.emit('userList',userList)
  });
  // user disconnects
  socket.on('disconnect', ()=>{
    // get info from socket.id?\
    //userList.find(user => user.id === socket.id)
    const exitedUser = userList.findIndex(user => user.id === socket.id)
    userList.splice(exitedUser, 1);
    console.log('bye')
    io.emit('userList',userList)
  })
  // send meow
  socket.on('meow', ()=>{
    socket.broadcast.emit('heard', socket.id)
    // emit the meow everywhere else
  })

})

app.use((req, res) => res.status(404).send('404 Not Found'));

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));