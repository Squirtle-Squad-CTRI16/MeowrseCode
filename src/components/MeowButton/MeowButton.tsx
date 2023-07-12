import React, { FC, useState } from 'react';
import './MeowButton.scss'
import deepMeow from '../../assets/deep-ass-meow.mp3'
import {socket} from '../../socket'
import type { MeowButtonProps } from '../../../types';

export const MeowButton: FC<MeowButtonProps> = ({userID}) => {
    //onclick, emit to server "meow" which is the signal to meow on all other clients in room
    const handleClick = () => {
      socket.emit("meow", userID);
      const meow = new Audio(deepMeow);
      meow.volume = 0.5;
      const meower = document.getElementById(userID);
      console.log(meower);
      meower?.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        {
          duration: 1000, // 1 second animation
          iterations: 1, // play animation once
          easing: 'linear', // linear animation timing
          fill: 'forwards', // maintain the final state after animation
        }
      );
      meow.play();
    }
    return (
      <button className='meow-button' onClick={handleClick}>
        Meow 😼
      </button>
    );
}