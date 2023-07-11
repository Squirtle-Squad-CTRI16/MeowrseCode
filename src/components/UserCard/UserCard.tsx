import React, { FC } from 'react';
import { MeowButton } from '../MeowButton/MeowButton';
import { socket } from '../../socket';
import './UserCard.scss';
import type { UserCardProps } from '../../../types';

export const UserCard: FC<UserCardProps> = ({userID}) => {

  return (
    <div className='user-card'>
      <img src='https://cataas.com/cat' />
      <MeowButton userID={socket.id}/>
    </div>
  )
}

