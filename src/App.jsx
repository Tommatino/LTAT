import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import About from "./Components/About/About.jsx";
import StatisticsChartPage from "./Components/StatisticsChart/StatisticsChartsPage.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import UserParametersFormPage from "./Components/UserParametersForm/UserParametersFormPage.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import AlcoholDayFormPage from "./Components/AlcoholDayForm/AlcoholDayFormPage.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/alcohol-form"
          element={
            <PrivateRoute>
              <AlcoholDayFormPage />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userform"
          element={
            <PrivateRoute>
              <UserParametersFormPage />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route
          path="/statistics-chart"
          element={
            <PrivateRoute>
              <StatisticsChartPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
