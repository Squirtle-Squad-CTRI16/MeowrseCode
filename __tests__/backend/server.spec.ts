// @ts-nocheck
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

interface ServerToClientEvents {
  join: (userName: string) => void;
};

interface ClientToServerEvents {
  join: (name: string) => void;
  disconnect: () => void;
  meow: () => void;
};

interface SocketEvents {
  close: () => void;
  
}

describe('Main sockets functionality', () => {
  let io;
  let serverSocket, clientSocket;

  beforeEach((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterEach(() => {
    io.close();
    clientSocket.close();
  });

  test('should send same name from server to client on join', (done) => {
    clientSocket.emit('join', 'Cat boy');
    serverSocket.on('join', (name: string) => {
      expect(name).toBe('Cat boy');
      done();
    });
  });

  // test('should send remove user on disconnect', (done) => {
  //   const userList = [];
  //   clientSocket.emit('join', 'Cat boy');
  //   serverSocket.on('join', (name) => {
  //     userList.push({ id: 'id', name, img: 'url' });
  //     expect(userList[0]).toBe({ id: 'id', name: 'Cat boy', img: 'url' });
  //     done();
  //   });

  //   serverSocket.on('disconnect', () => {
  //     const exitedUser = userList.findIndex((user) => user.id === socket.id);
  //     userList.splice(exitedUser, 1);  
  //     expect(userList.length).toBe(0);
  //     done();
  //   });    
  // });


});