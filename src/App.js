import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import Components
import { PrivateRoute, GuestRoute } from './components/CustomRoutes'
import Login from './components/login'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import LandPage from './components/land-page'
import Register from './components/register'
import CreateAnnouncement from './components/create-announcement'
import { AuthProvider } from './contexts/authContext'

const App = () => {

  return (
    <>
      <AuthProvider>
        <PrivateRoute path="/auth" component={Header} />
        <div className="app__main">
          <Switch>
            <GuestRoute exact path="/" component={LandPage} />
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/register" component={Register} />
            <PrivateRoute path="/auth/create" component={CreateAnnouncement} />
            <PrivateRoute exact path="/auth" component={Home} />
            <Route path="*" render={() => <h2>404 not found</h2>} />
          </Switch>
        </ div>
        <Route path="/" component={Footer} />
      </AuthProvider>
    </>
  )
};

export default App;
