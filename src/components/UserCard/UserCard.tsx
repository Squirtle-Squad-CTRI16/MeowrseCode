import React, { FC } from 'react';
import './UserCard.scss';
import type { UserCardProps } from '../../../types';


export const UserCard: FC<UserCardProps> = ({id,img,name}) => {

  return (
    <div id={id} className="user-card" >
      <img className='user-img'  src={img} />
      <h4>{name}</h4>
    </div>
  )
}

