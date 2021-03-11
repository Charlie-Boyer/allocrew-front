import React, { useState, useRef } from 'react';
import { imageUpload } from '../../utils/functions';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';

function PostForm({ submitFunction, user, edit }) {

  const history = useHistory();
  const inputEl = useRef(null);
  const canva = useRef(null);
  const [imgUrl, setImgUrl] = useState(edit?.picture ||'null');


  return (

    <div className="form__container">
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: edit?.title || "",
          location: edit?.location || "",
          description: edit?.description || "",
          salary: "",
          picture: imgUrl
        }}

        onSubmit={(data) => submitFunction(data, user, edit?.id).then(res => res && history.push('/'))}
      >
        <Form className="form" >
          <label className="form__desktop--Title">Choisissez une image</label>
          <input name="img" ref={inputEl} type="file" onChange={() => imageUpload(inputEl, setImgUrl, canva)}
          />
          <canvas hidden ref={canva} width="0" height="0" id="mycanvas"></canvas>
          <label className="form__desktop--Title">Titre de l'annonce</label>
          <Field
            name="title"
            className="form__input input "
            type="text"
            placeholder="Titre de l'annonce"
          />
          <label className="form__desktop--Title">Lieu</label>
          <Field
            name="location"
            className="form__input input "
            type="text"
            placeholder="Lieu de l'annonce"
          />
          <div>
            <label htmlFor="unpaid" className="form__radio">Bénévole</label>
            <Field
              id="unpaid"
              name="salary"
              className="form__unpaid"
              type="radio"
              value="ok"
            />
          </div>
          <div>
            <label htmlFor="paid" className="form__radio">Rémunéré</label>
            <Field
              id="paid"
              name="salary"
              className="form__paid"
              type="radio"
              value=""
            />
          </div>
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
            <Link to="/">
              <button className="form__button button">Retour</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div >
  );
}

export default PostForm
