import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
// import { date } from 'utils/functions';
// import ReactHtmlParser from 'react-html-parser';

const Announce = ({
  title, location, description, picture, voluntary, id, dateEnd, dateStart, active, user, createdAt, userId,
}) => 

(
  <div className="announce">
    <div className="announce__banner" style={{ backgroundImage: `url(${picture})` }}>
      <div className="announce__avatar" style={{ backgroundImage: `url(${user.picture})` }} />
    </div>
    <Link to={`/profile/${user.id}`}>
      <p className="announce__user">
        {user.firstname} {user.lastname} - {user.title}
        <span className="announce__creation">créée le {createdAt}</span>
      </p>
    </Link>
    <div className="announce__bot">
      <div className="announce__botleft">
        <p className="announce__title">{title}</p>
        <div className="announce__description">
          {description.length > 150 ? `${description.substring(0, 149)} ...` : description}
        </div>
      </div>
      <div className="announce__botright">
        <div className="announce__details">
          {/* <p>du {dateStart} au {dateEnd}</p> */}
          <p>à {location}</p>
          <p> {voluntary ? 'Bénévole' : 'Rémunérée'}</p>
        </div>
        <input className="announce__button button see" type="button" value="Voir l'annonce" />
        <Link to={`/announcement/${id}`}>
          <input className="announce__button button seeAndEdit" type="button" value="Voir l'Annonce" />
        </Link>
      </div>
    </div>
  </div>
);

export default Announce;
