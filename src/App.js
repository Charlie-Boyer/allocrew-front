import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { token } from './utils/token';

// import Components
import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import LandPage from './components/land-page';

const App = () => {


  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState('');
  const [auth, setAuth] = useState(false);

  const logout = () => {
    localStorage.removeItem('token')
    setAuth(false);
  }

  const connect = async (data) => {
    setFlash('')
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
      if (res.status !== 200) {
        setFlash(content.message)
      }
      if (res.status === 200) {
        localStorage.setItem('token', content.token)
        const getToken = async () => await localStorage.getItem('token')
        getToken().then(setAuth(true))
      }
    } catch (error) {
      setFlash('Une erreur est apparue ' + error)
    }
  }

  useEffect(() => {

    async function data() {
      try {
        const res = await fetch(
          'https://allocrew.herokuapp.com/api/token_check', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token()}`,
          },
        }
        )
        const status = await res.status
        if (status === 201) { setAuth(true) }
        setLoading(false)
      } catch (error) {
      }
    }
    data()
  }, []);


  if (loading) { return <div className="landPage__Container" style={{ backgroundColor: 'white'}}>loading...</div> }

  return (
    <>
      {!auth
        ?
        <Switch>
          <Route path="/login" >
            <Login connect={connect} flash={flash} />
          </ Route >
          <Route path="*" render={LandPage} />
        </Switch>
        :
        <>
          <div className="app__header">
            <Header logout={logout} />
          </div>
          <div className="app__main">
            <Switch>
              <Route path="/prout" exact component={Footer} />
              <Route path="*" exact component={Home} />
            </Switch>
          </div>
          <div className="app__footer">
            <Footer />
          </div>
        </>
      }
    </>

  )
};

export default App;
