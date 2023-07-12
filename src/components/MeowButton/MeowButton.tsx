import React, { FC, useState } from 'react';
import './MeowButton.scss'
import deepMeow from '../../assets/deep-ass-meow.mp3'
import {socket} from '../../socket'
import type { MeowButtonProps } from '../../../types';

export const MeowButton: FC<MeowButtonProps> = ({userID}) => {
    //onclick, emit to server "meow" which is the signal to meow on all other clients in room
    const handleClick = () => {
      socket.emit("meow", userID);
      // const meow = new Audio(deepMeow);
      // meow.play();
    }
    return (
      <button className='meow-button' onClick={handleClick}>
        Meow 😼
      </button>
    );
}