import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import decode from "jwt-decode";

const AuthContext = createContext();



// Custom Hook 

export function useAuth() {
  return useContext(AuthContext);
};




export function AuthProvider({ children }) {


  const history = useHistory()
  const [user, setUser] = useState({})
  
  useEffect(storeUser, [])


  function token() {
    let encoded = localStorage.getItem('token')
    return encoded && decode(encoded)
  };



  function checkAuth() {
    if (!token()) { return false }
    try {
      let time = () => Date.now() / 1000
      if (time() < token().exp) {
        return true
      }
    } catch (error) {
      return false
    }
  };



  function storeUser() {
    setUser({ userId: token()?.id });
  };



  function logout() {
    localStorage.removeItem('token');
    history.push('/');
  };


  //This object contains all the props I want to have access to via this context
  let value = {
    user,
    setUser,
    checkAuth,
    storeUser,
    logout,

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};