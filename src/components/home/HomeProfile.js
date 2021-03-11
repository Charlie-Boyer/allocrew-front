import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import local
import './style.scss';
import { getUser } from '../../api/userApi'
import { token, userToken } from '../../utils/token';

const HomeProfile = () => {

  const [ userInfo, setUserInfo ] = useState({})

  useEffect(() => {
    getUser(token, userToken, setUserInfo)
  }, []);

  return (
    <>
      <div className="homeprofile__avatar" id={userInfo.id} style={{ backgroundImage: `url(${userInfo.picture})` }} />
      <div className="homeprofile__text">
        <p className="homeprofile__text--name">{userInfo.firstname} {userInfo.lastname}</p>
        <p className="homeprofile__text--role">{userInfo.title}</p>
        <ul>
          <Link to="/profile"><li className="home__liste">Voir mon profil</li></Link>
          <Link to="/auth/edit-user-info"><li className="home__liste">Modifier mon profil</li></Link>
          <Link to="/my-announcements"><li className="home__liste">Mes annonces</li></Link>
          <Link to="/auth/chat"><li className="home__liste">Messagerie</li></Link>
          <Link to="/"><li className="home__liste">Déconnexion</li></Link>
        </ul>
        <Link to="/auth/create"><input className="button" type="home__button button" value="Poster une annonce" readOnly /></Link>
      </div>
    </>
  );
}


export default HomeProfile;
