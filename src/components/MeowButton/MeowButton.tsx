import React, { FC, useState } from 'react';
import './MeowButton.scss'
import {socket} from '../../socket'

export const MeowButton = (userID: string) => {
    //onclick, emit to server "meow" which is the signal to meow on all other clients in room
    const handleClick = () => {
        socket.emit("meow", userID)
    }
    return (
        <button className='meow-button' onClick={handleClick}>Meow</button>
    )
}