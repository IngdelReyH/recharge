import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router-dom'
//import { RouteProps,RouteComponentProps, useParams } from 'react-router-dom'
import { RootStoreContext } from '../stores/rootStore'




const PrivateRoute = ({Component}:any) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn,estaLogeao} = rootStore.userStore;
    console.log("esta logeao:",estaLogeao);
    return isLoggedIn ? <Component/> : <Navigate to='/'/>;
}

export default PrivateRoute


/*function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}*/