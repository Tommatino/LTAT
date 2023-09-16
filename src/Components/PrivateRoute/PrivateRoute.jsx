import useUserLogin from "../../Hooks/useUserLogin.js";
import Login from "../Login/Login.jsx";

function PrivateRoute({ children }) {
  const user = useUserLogin();
  if (!user) {
    return <Login />;
  }

  return children;
}

export default PrivateRoute;
