import Header from './Header/Header.jsx'
import Footer from "./Footer/Footer.jsx";
import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Statistics from "./Statistics/Statistics.jsx";
import Signup from "./Signup/Signup.jsx";
import Login from "./Login/Login.jsx"


import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from 'react-router-dom';

function App() {

  return (
    <Router>
        <Header />
        <Routes>
            <Route path ="/" element={<Home />}/>
            <Route path ="/signup" element={<Signup />}/>
            <Route path ="/login" element={<Login />}/>
            <Route path ="/about" element={<About />}/>
            <Route path ="/statistics" element={<Statistics />}/>
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
