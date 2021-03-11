import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Formik, Field, Form } from 'formik';
import { imageUpload } from '../../utils/functions';
import { useAuth } from '../../contexts/authContext';
import { editUserInfo } from '../../api/userApi';

const EditUserInfo = () => {
  
  const [imgUrl, setImgUrl] = useState('');
  const { user } = useAuth();
  const inputEl = useRef(null);
  const canva = useRef(null);

  return (
    <div className="form__container">
      <h2 className="form__title">Modifiez votre profil</h2>
      <Formik
        enableReinitialize={true}
        initialValues={{ firstname: "Nouvel", lastname: "utilisateur", location: "", description: "", picture: imgUrl }}
        onSubmit={(data) => editUserInfo(data, user.userId)}
      >
        <Form className="form" >
          <label className="form__desktop--Title">Choisissez une image</label>
          <input name="img" ref={inputEl} type="file" onChange={() => imageUpload(inputEl, setImgUrl, canva)}
          />
          <canvas hidden ref={canva} width="0" height="0" id="mycanvas"></canvas>
          <label className="form__desktop--Title">Prénom</label>
          <Field
            name="firstname"
            className="form__input input "
            type="text"
            placeholder="Prénom"
          />
          <label className="form__desktop--Title">Nom</label>
          <Field
            name="lastname"
            className="form__input input "
            type="text"
            placeholder="Nom"
          />
           <label className="form__desktop--Title">Ville</label>
          <Field
            name="location"
            className="form__input input "
            type="text"
            placeholder="Ville"
          />
          <label>Description</label>
          <Field
            as="textarea"
            name="description"
            className="form__textarea input "
            type="text"
            placeholder="Description"
          />
          <div>
            <button type="submit" className="form__button button">Enregister</button>
            <Link to="/home">
              <button className="form__button button">Retour</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>

  );
};

export default EditUserInfo;
