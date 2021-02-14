import React from 'react';
import './style.scss';
import { Formik, Field, Form } from 'formik';


const Login = ({connect, flash}) => {

  
  return (
    <div className="login__container">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={connect}
      >

        <Form className="login__form">
          <h1>Connexion</h1>
          <p style={{ "color": "white" }}>{flash}</p>
          <Field
            name="username"
            className="login__input"
            type="text"
            placeholder="E-mail" />
          <Field
            name="password"
            className="login__input"
            type="password"
            placeholder="Mot de passe" />
          <button className="login__button" type="submit">Se connecter</button>
        </Form>

      </Formik>
    </div >
  )
};

export default Login;
