import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Statistics from "./Components/Statistics/Statistics.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import UserParametersForm from "./Components/UserParametersForm/UserParametersForm.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userform"
          element={
            <PrivateRoute>
              <UserParametersForm />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route
          path="/statistics"
          element={
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
