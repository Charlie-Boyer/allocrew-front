import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './style.scss';
// import DatePicker from 'react-datepicker';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Field, Form } from 'formik';


const CreateAnnouncement = () => {


  // const newStartDate = new Date(dateStart);
  // const newEndDate = new Date(dateEnd);

  return (
    <div className="createAnnouncement__container">
      <h2 className="createAnnouncement__title">Créez une annonce</h2>
      <Formik
        initialValues={{ title: "", location: "", description: "" }}
      >
        <Form id="myform" >
          <div className="input create__bannerPicture " >
            <input
              type="file"
              className="input gut"
              name="picture"
            />
            <div className="button">Importer</div>
            <p>Image de l'annonce</p>
          </div>
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
          <label htmlFor="volonteer" className="createAnnouncement__radio">Bénévole</label>
          <input
            className="createAnnouncement__volunteer "
            type="radio"
            id="volonteer"
            name="drone"
            value="volonteer"
          // onChange={handleChecked}
          // checked={!!voluntary}
          />
          <label htmlFor="paid" className="createAnnouncement__radio">Rémunéré</label>
          <input
            className="createAnnouncement__paid "
            type="radio"
            id="paid"
            name="paid"
            value="paid"
          // onChange={handleChecked}
          // checked={!voluntary}
          />

          <label>Description</label>.
            <Field
            name="description"
            className="createAnnouncement__input input "
            type="text"
            placeholder="Description"
          />
          {/* <CKEditor
              className="editor"
              editor={ClassicEditor}
              // data={{}}
              // onChange={handleChangeEditor}
              config={{
                removePlugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed', 'TableToolbar', 'Table', 'Indent'],
                toolbarLocation: 'bottom',
              }}
            /> */}
          <button type="submit" className="createAnnouncement__button button">Enregister</button>
          <Link to="/home">
            <button className="createAnnouncement__button button">Retour</button>
          </Link>
        </Form>
      </Formik>
    </div >
  );
};

export default CreateAnnouncement;
