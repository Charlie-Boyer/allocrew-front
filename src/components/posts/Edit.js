import React, {useState} from 'react';
import { patchEditAnnouncement } from '../../api/announcementsAPI';
import PostForm from './PostForm';

function Edit(props) {

  const [edit] = useState(props.location.state);

  return (
    <div>
      <div>
      <h2 className="form__title">Editez votre annonce</h2>
      <PostForm submitFunction={patchEditAnnouncement} edit={edit} />
    </div>
    </div>
  )
}

export default Edit
