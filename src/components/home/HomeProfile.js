import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import local
import './style.scss';
import { token, userToken } from '../../utils/token';

const HomeProfile = () => {

  const [ userInfo, setUserInfo ] = useState({
    id: '',
    backgroundImage: '',
    picture: '',
    firstname: '',
    lastname: '',
    title: ''
  })

  useEffect(() => {
    async function data() {
      try {
        const res = await fetch(
          `https://allocrew.herokuapp.com/api/users/${userToken.id}`, {
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
        )
        const content = await res.json();
        if (res.status === 200){ setUserInfo(content[0]) }
      } catch (error) {
      }
    }
    data()
  }, []);

  const token = localStorage.getItem('token')

  return (
    <>
      <div className="homeprofile__avatar" id={userInfo.id} style={{ backgroundImage: `url(${userInfo.picture})` }} />
      <div className="homeprofile__text">
        <p className="homeprofile__text--name">{userInfo.firstname} {userInfo.lastname}</p>
        <p className="homeprofile__text--role">{userInfo.title}</p>
        <ul>
          <Link to="/profile"><li className="home__liste">Voir mon profil</li></Link>
          <Link to="/edit-profile"><li className="home__liste">Modifier mon profil</li></Link>
          <Link to="/my-announcements"><li className="home__liste">Mes annonces</li></Link>
          <Link to="/tchat-room"><li className="home__liste">Messagerie</li></Link>
          <Link to="/"><li className="home__liste">Déconnexion</li></Link>
        </ul>
        <Link to="/create-announcement"><input className="button" type="home__button button" value="Poster une annonce" readOnly /></Link>
      </div>
    </>
  );
}


export default HomeProfile;
