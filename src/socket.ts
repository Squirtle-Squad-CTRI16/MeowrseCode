import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'production' ? undefined: 'http://localhost:3001';
//@ts-ignore
export const socket = io(URL);