import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';

// import Components
import { PrivateRoute, GuestRoute } from './components/CustomRoutes';
import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import LandPage from './components/land-page';
import Register from './components/register';
import NewPost from './components/posts/Create';
import EditPost from './components/posts/Edit';
import EditUserInfo from './components/edit-user-info';
import Chat from './components/chat/Chat';





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
            <PrivateRoute path="/auth/create" component={NewPost} />
            <PrivateRoute path="/auth/edit" component={EditPost} />
            <PrivateRoute exact path="/auth" component={Home} />
            <PrivateRoute exact path="/auth/edit-user-info" component={EditUserInfo} />
            <PrivateRoute exact path="/auth/chat" component={Chat} />
            <Route path="*" render={() => <h2>404 not found</h2>} />
          </Switch>
        </ div>
        <Route path="/" component={Footer} />
      </AuthProvider>
    </>
  )
};

export default App;
