import React, { useRef, useEffect, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const Header = ({logout}) => {
  const ref = useRef(null);

  // State du menu burger
  const [menuState, setMenuState] = useState(false);

  // ecouteur d'évenement
  useEffect(
    () => {
      // fonction pour l'écouteur
      const handleClick = (e) => {
        ref.current === e.target && !menuState ? setMenuState(true) : setMenuState(false);
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [menuState],
  );


  return (
    <nav className="header__nav">
      <div className="transparent" />
      <Link to="/home">
        <div className="header__logo__container">
          <div className="header__logo ">AlloCrew</div>
        </div>
      </Link>
      <>
        <div className="header__links-desktop">
          <ul className="">
            <Link to="/home"><li>Accueil</li></Link>
            <Link to="/search"><li>Rechercher</li></Link>
            <Link to="/tchat-room"><li>Messagerie</li></Link>
          </ul>
        </div>
        <div ref={ref} className="header__menuButton">+</div>
      </>
      {/* Menu burger */}
      {menuState && (
        <div className="header__menu">
          <ul className="header__links-mobile">
            <Link to="/home"><li>Accueil</li></Link>
            <Link to="/search"><li>Rechercher</li></Link>
            <Link to="/tchat-room"><li>Messagerie</li></Link>
          </ul>
          <ul className="header__links">
            <Link to="/profile"><li>Voir mon profil</li></Link>
            <Link to="/edit-profile"><li>Modifier mon profil</li></Link>
            <Link to=""><li >Paramètres</li></Link>
            <Link to="/" onClick={logout}><li >Déconnexion</li></Link>
          </ul>
        </div>
      )}
    </nav>
  );
};


export default Header;
