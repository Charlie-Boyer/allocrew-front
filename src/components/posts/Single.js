import React, { useState } from 'react';
import './style.scss';
import { useAuth } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { deleteAnnouncement } from '../../api/announcementsAPI';
import { useHistory } from 'react-router-dom';
import { postRoom } from '../../api/chatAPI';

const Single = (data) => {


  const history = useHistory();
  const [modal, setModal] = useState('');
  const { user } = useAuth();
  const [confirm, setConfirm] = useState(null)



  console.log(data.user.id, user.userId)
  return (
    <div onClick={() => modal && setModal('')} className={modal}>

      <div className={`single`}>


        {/* TOP  */}
        <div className="single-top">
          <div className="single-banner" style={{ backgroundImage: `url(${data.picture})` }} />
        </div>

        {/* MIDDLE  */}
        <div className="single-middle">
          <div className="single-avatar" style={{ backgroundImage: `url(${data.user.picture})` }} />
          <p >
            posté par {data.user.firstname} {data.user.lastname} le {data.createdAt}
          </p>
        </div>

        {/* BOT  */}
        <div className="single-bot">

          {/* BOT LEFT  */}
          <div className="single-left">
            <p className="single-title">{data.title}</p>
            <p className="single-description">
              {modal ?
                data.description :
                data.description.length > 150 ? `${data.description.substring(0, 149)} ...` : data.description
              }
            </p>
          </div>

          {/* BOT RIGHT  */}
          <div className="single-right">
            <p>{data.location}</p>
            <p> {data.voluntary ? 'Bénévole' : 'Rémunérée'}</p>
            {!modal && <input onClick={() => setModal('modal')} className=" button" type="button" value="Voir l'Annonce" />}




            {modal && (data.user.id !== user.userId) && (
              <>
                <input onClick={() => postRoom(data.id, user.userId, data.user.id)} className=" button single-options" type="button" value="Envoyer un message" />
              </>
            )}


            {modal && (data.user.id === user.userId) && (
              <>
                <Link to={{
                  pathname: '/auth/edit',
                  state: {
                    ...data
                  }
                }}>
                  <input className=" button single-options" type="button" value="Editer" />
                </Link>
                <input onClick={() => setConfirm(true)} className=" button single-options" type="button" value="Supprimer" />
              </>
            )}
          </div>

        </div>

        {/* END  */}

      </div>
      {confirm &&
        <div className="modal">
          <div className="alert">
            <p>Etes vous sur de vouloir supprimer cette annonce?</p>
            <input className="button" onClick={() => {deleteAnnouncement(data.id).then((res) => res && history.push('/'))}} type="button" value="Confirmer" />
            <input className="button" onClick={() => setConfirm(false)} type="button" value="Retour" />
          </div>
        </div>
      }
    </div>
  )
};

export default Single;
