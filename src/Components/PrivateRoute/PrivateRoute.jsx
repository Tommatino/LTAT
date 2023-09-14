import useUserData from "../../Hooks/useUserData.js";
import Login from "../Login/Login.jsx";

function PrivateRoute({ children }) {
  const user = useUserData();
  if (!user) {
    return <Login />;
  }

  return children;
}

export default PrivateRoute;
