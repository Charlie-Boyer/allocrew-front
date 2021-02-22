import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../api/authContext'

export function PrivateRoute({ component: Component, ...rest }) {

  const { checkAuth } = useAuth()

  return (
    <Route
      {...rest}
      render={props => checkAuth() ? <Component {...props} /> : <Redirect to="/login" />      
      }
    />
  )
}

export function GuestRoute({ component: Component, ...rest }) {

  const { checkAuth } = useAuth()

  return (
    <Route
      {...rest}
      render={props => checkAuth() ? <Redirect to="/auth" /> :<Component {...props} />      
      }
    />
  )
}

