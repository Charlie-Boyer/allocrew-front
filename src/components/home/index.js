import React, { useState, useEffect } from 'react';
// import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { token, userToken } from '../../utils/token';

// import local
import './style.scss';
import Profile from './HomeProfile';
import AnnouncementList from '../announcement-list';

const Home = () => {

  const [filter, setFilter] = useState('all');
  const [list, setList] = useState([]);

  useEffect(() => {
    async function data() {
      try {
        const res = await fetch(
          'https://allocrew.herokuapp.com/api/announcements', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${token()}`,
          },
        }
        )
        const content = await res.json();
        if (res.status === 200){ setList(content) }
      } catch (error) {
      }
    }
    data()
  }, []);


  return (
    <div className="home__container">
      {console.log(userToken())}
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
