// import cookie
import Cookies from 'js-cookie';

// import react-router-dom
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const token = Cookies.get('token');
  const status = Cookies.get('status_verified');

  return (
    <Route
      {...rest}
      render={() => {
        if (token && status === 'true') {
          return children;
        } else if (token && status === 'false') {
          return <Redirect to="/verify-email" />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
