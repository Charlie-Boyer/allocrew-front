import React from 'react';
import './style.scss';
import Announce from './Announce';

const AnnouncementList = ({list}) => {

  

  return (
    <div className="announcementList__container">
      {
        list.sort(({ id: previousID }, { id: currentID }) => currentID - previousID).map((announcement) => <Announce key={announcement.id} {...announcement} />)
      }
    </div>
  )
};


export default AnnouncementList;
