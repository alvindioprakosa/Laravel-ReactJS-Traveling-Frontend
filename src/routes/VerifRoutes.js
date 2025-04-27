// import cookie
import Cookies from "js-cookie";

// import react-router-dom
import { Route, Redirect } from "react-router-dom";

function VerifRoutes({ children, ...rest }) {
  const token = Cookies.get("token");
  const status = Cookies.get("status_verified");

  return (
    <Route
      {...rest}
      render={() => 
        token && status === "false" ? children : <Redirect to="/" />
      }
    />
  );
}

export default VerifRoutes;
