import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.scss'
import { Formik, Field, Form } from 'formik'
import { useAuth } from '../../api/authContext'


const Login = () => {

  let history = useHistory()
  let { storeUser } = useAuth()

  async function onLoginSubmit(data) {
    try {
      const res = await fetch(
        'https://allocrew.herokuapp.com/api/login_check', {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      }
      )
      const content = await res.json()
      console.log(content)
      if (res.ok) {
        localStorage.setItem('token', content.token)
        storeUser()
        return history.push('/auth')
      }
    } catch (error) {
    }
  }
  
  return (
    <div className="login__container">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onLoginSubmit}
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
