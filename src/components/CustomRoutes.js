import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export function PrivateRoute({ component: Component, ...rest }) {

  const { checkAuth } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth()) {
          return <Component {...props} />
        }
        else {
          return <Redirect to="/login" />
        }
      }
      }
    />
  )
}

export function GuestRoute({ component: Component, ...rest }) {

  const { checkAuth } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth()) {
          return <Redirect to="/auth" />
        }
        else {
          return <Component {...props} />
        }
      }
      }
    />
  )
}

