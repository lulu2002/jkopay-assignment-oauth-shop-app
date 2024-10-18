import {Navigate} from 'react-router-dom';
import Element = React.JSX.Element;

interface PrivateRouteProps {
  children: Element
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jkopay-shop-token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (e) {
      console.log(e)
      return false;
    }
  };
  return isAuthenticated() ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;