import React from 'react';
import './style.scss';
import { Formik, Field, Form } from 'formik';
import { registerUser} from '../../api/userApi';


const Register = () => {

  
  return (
    <div className="login__container">
      <Formik
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
        onSubmit={(data) => registerUser(data)}
      >

        <Form className="login__form">
          <h1>Inscription</h1>
          <Field
            name="firstname"
            className="login__input"
            type="text"
            placeholder="Prénom" />
          <Field
            name="lastname"
            className="login__input"
            type="text"
            placeholder="Nom" />
          <Field
            name="email"
            className="login__input"
            type="text"
            placeholder="E-mail" />
          <Field
            name="password"
            className="login__input"
            type="password"
            placeholder="Mot de passe" />
          <button className="login__button" type="submit">S'enregistrer</button>
        </Form>

      </Formik>
    </div >
  )
};

export default Register;