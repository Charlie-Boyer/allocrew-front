import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Formik, Field, Form } from 'formik';
import { postCreateAnnouncement } from '../../api/announcementsAPI';
import { useAuth } from '../../contexts/authContext';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css'


const CreateAnnouncement = () => {
  const [imgUrl, setImgUrl] = useState('');

  const { user } = useAuth();
  const inputEl = useRef(null);
  const canva = useRef(null);
  console.log('ppp', imgUrl)

  return (
    <div className="createAnnouncement__container">
      <h2 className="createAnnouncement__title">Créez une annonce</h2>
      <Formik
        enableReinitialize={true}
        initialValues={{ title: "", location: "", description: "", salary: "ok", picture: imgUrl }}
        onSubmit={(data) => postCreateAnnouncement(data, user)}
      >
        <Form id="myform" >
          <input name="img" ref={inputEl} type="file" onChange={() => {

            var img = new Image();
            img.src = URL.createObjectURL(inputEl.current.files[0]);

            var ctx = canva.current.getContext('2d');

            img.onload = function () {
              canva.current.width = img.width;
              canva.current.height = img.height;
              ctx.drawImage(img, 0, 0);
              const base64 = canva.current.toDataURL('image/png')
              setImgUrl(base64)
            };
          }}
          />
          <canvas hidden ref={canva} width="0" height="0" id="mycanvas"></canvas>
          <Field
            hidden
            name="picture"
            type="text"
          />
          <label className="createAnnouncement__desktop--Title">Titre de l'annonce</label>
          <Field
            name="title"
            className="createAnnouncement__input input "
            type="text"
            placeholder="Titre de l'annonce"
          />
          <label className="createAnnouncement__desktop--Title">Lieu</label>
          <Field
            name="location"
            className="createAnnouncement__input input "
            type="text"
            placeholder="Lieu de l'annonce"
          />
          <div>
            <label htmlFor="unpaid" className="createAnnouncement__radio">Bénévole</label>
            <Field
              id="unpaid"
              name="salary"
              className="createAnnouncement__unpaid"
              type="radio"
              value="ok"
            />
            <label htmlFor="paid" className="createAnnouncement__radio">Rémunéré</label>
            <Field
              id="paid"
              name="salary"
              className="createAnnouncement__paid"
              type="radio"
              value=""
            />
          </div>
          <label>Description</label>
          <Field
            as="textarea"
            name="description"
            className="createAnnouncement__textarea input "
            type="text"
            placeholder="Description"
          />
          <div>
            <button type="submit" className="createAnnouncement__button button">Enregister</button>
            <Link to="/home">
              <button className="createAnnouncement__button button">Retour</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div >
  );
};

export default CreateAnnouncement;
