// @ts-nocheck
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import type { UserList } from '../../types';

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

  describe(`on('join')`, () => {

    test('should send same name from client to server', (done) => {
      serverSocket.on('join', (name: string) => {
        expect(name).toBe('CatBoy');
        expect(name).not.toBeNull();
        done();
      });
      clientSocket.emit('join', 'CatBoy');
    });
    
    test('should send null from client to server', (done) => {
      serverSocket.on('join', (name: string) => {
        expect(name).not.toBe('CatBoy');
        expect(name).toBeNull();
        done();
      });
      clientSocket.emit('join', null);
    });

  });
  
  // test('should send id to fronted on meow', (done) => {
  //   serverSocket.on('meow', () => {
  //     expect(serverSocket.id).toBe('someRandomString');
  //     done();
  //   });
  //   clientSocket.emit('meow', 'someRandomString');
  // });

  describe(`userList on('join')`, () => {
    
    let userList: UserList[];

    beforeAll(() => userList = []);

    test('should add user to empty userList', (done) => {
      clientSocket.emit('join', 'CatBoy');
      serverSocket.on('join', (name) => {
        userList.push({ id: 'id1', name, img: 'url1' });
        expect(userList[0]).toEqual({ id: 'id1', name, img: 'url1' });
        expect(userList.length).toBe(1);
        expect(userList.length).not.toBe(0);
        expect(userList).toBeDefined();
        done();
      });
    });

    test('should add user to nonempty userList', (done) => {
      clientSocket.emit('join', 'user2');
      serverSocket.on('join', (name) => {
        userList.push({ id: 'id2', name, img: 'url2' });
        expect(userList[1]).toEqual({ id: 'id2', name: 'user2', img: 'url2' });
        expect(userList.length).toBe(2);
        expect(userList.length).not.toBe(1);
        done();
      });
    });
    
  });
  
  describe(`on('disconnect')`, () => {
    
    let userList: UserList[];

    beforeAll(() => (userList = [
      { id: 'id1', name: 'name1', img: 'url1' },
      { id: 'id2', name: 'name2', img: 'url2' },
      ])
    );

    test('should remove one user from userList', (done) => {
      clientSocket.close();
      serverSocket.on('disconnect', () => {
        const exitedUser = userList.findIndex((user) => user.id === 'id1');
        userList.splice(exitedUser, 1);  
        expect(userList.length).toBe(1);
        expect(userList.length).not.toBe(2);
        expect(userList.length).not.toBe(0);
        expect(userList).not.toBeUndefined();
        done();
      });    
    });
    
    test('should empty userList when length is one', (done) => {
      clientSocket.close();
      serverSocket.on('disconnect', () => {
        const exitedUser = userList.findIndex((user) => user.id === 'id2');
        userList.splice(exitedUser, 1);  
        expect(userList.length).toBe(0);
        expect(userList.length).not.toBe(1);
        expect(userList.length).not.toBe(2);
        expect(userList).not.toBeUndefined();
        done();
      });    
    });
    
  });


});