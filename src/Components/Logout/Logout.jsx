import { signOut } from "firebase/auth";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase.js";

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [error, setError] = useState(null);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setError(null);
        navigate("/login");
      })
      .catch((error) => {
        setError(error?.message || "Coś poszło nie tak");
      });
  };

  return (
    <>
      <button onClick={handleLogOut}>Log out</button>
      {error && <p>{error}</p>}
    </>
  );
}

export default Logout;
