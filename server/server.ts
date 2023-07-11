import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:'*'}}); // allow cors from anywhere, can change to just client later 

app.use(express.json());

app.use(express.static(path.join(__dirname, '../src')));

io.on('connection', socket => {
  console.log('new user!')
})

app.use((req, res) => res.status(404).send('404 Not Found'));

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));