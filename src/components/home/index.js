import React, { useState, useEffect } from 'react';
// import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { token, userToken } from '../../utils/token';

// import local
import './style.scss';
import Profile from './HomeProfile';
import AnnouncementList from '../announcement-list';
import { getAnnouncements } from '../../api/announcementsAPI'

const Home = () => {

  const [filter, setFilter] = useState('all');
  const [list, setList] = useState([]);

  useEffect(() => {
    getAnnouncements(token, setList)
  }, []);


  return (
    <div className="home__container">
      <div className="home__left">
        <div className="home__profile">
          <Profile/>
        </div>
        <div className="home__news">
          {/* <TwitterTimelineEmbed
            sourceType="profile"
            screenName="crewallo"
            theme="dark"
            transparent
            noScrollbar
            placeholder="Loading Twitter"
            noHeader
            options={{ height: 350 }}
          /> */}
        </div>
      </div>
      <div className="home__list">
        <ul className="home__navlink">
          <li
            className={filter === 'voluntary' ? 'home__navlink-links _blue' : 'home__navlink-links'}
            onClick={() => {
              window.scrollTo(0, 0); setFilter('voluntary');
            }}
          >Bénévoles
          </li>
          <li
            className={filter === 'paid' ? 'home__navlink-links _blue' : 'home__navlink-links'}
            onClick={() => {
              window.scrollTo(0, 0); setFilter('paid');
            }}
          >Rémunérées
          </li>
          <li
            className={filter === 'all' ? 'home__navlink-links _blue' : 'home__navlink-links'}
            onClick={() => {
              window.scrollTo(0, 0); setFilter('all');
            }}
          >Toutes les annonces
          </li>
          <li
            className={filter === 'my' ? 'home__navlink-links _blue' : 'home__navlink-links'}
            onClick={() => {
              window.scrollTo(0, 0); setFilter('my');
            }}
          >Mes annonces
          </li>
        </ul>
        {filter === 'voluntary' && <AnnouncementList list={list.filter((one) => one.voluntary === true)} />}
        {filter === 'paid' && <AnnouncementList list={list.filter((one) => one.voluntary === false)} />}
        {filter === 'all' && <AnnouncementList list={list.map((one) => one)} />}
        {filter === 'my' && <AnnouncementList list={list.filter((one) => one.user.id === userToken().id )} />}
      </div>
    </div>
  );
};
export default Home;
