import React from 'react';
import './style.scss';
import { Formik, Field, Form } from 'formik';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../api/userApi';


const Login = () => {

  // used for redirection in logiUser
  let history = useHistory()
  // sets an userId prop in auth context
  let { storeUser } = useAuth()


  return (
    <div className="login__container">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(data) => loginUser(data, history, storeUser)}
      >
        <Form className="login__form">
          <h1>Connexion</h1>
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
