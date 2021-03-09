import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Formik, Field, Form } from 'formik';
import { postCreateAnnouncement } from '../../api/announcementsAPI';
import { useAuth } from '../../contexts/authContext';


const CreateAnnouncement = () => {

  const { user } = useAuth();
  
  return (
    <div className="createAnnouncement__container">
      <h2 className="createAnnouncement__title">Créez une annonce</h2>
      <Formik
        initialValues={{ title: "", location: "", description: "", salary: "ok" }}
        onSubmit={(data) => postCreateAnnouncement(data, user)}
          >
          <Form id="myform" >
            {/* <div className="input create__bannerPicture " >
            <input
              type="file"
              className="input gut"
              name="picture"
            />
            <div className="button">Importer</div>
            <p>Image de l'annonce</p>
          </div> */}
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
