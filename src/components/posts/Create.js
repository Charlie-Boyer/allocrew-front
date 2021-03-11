import React from 'react';
import PostForm from './PostForm';
import { postCreateAnnouncement } from '../../api/announcementsAPI';
import { useAuth } from '../../contexts/authContext';


function Create() {

  const {user} = useAuth();

  return (
    <div>
      <h2 className="form__title">Créez votre annonce</h2>
      <PostForm submitFunction={postCreateAnnouncement} user={user} />
    </div>
  )
}

export default Create;
