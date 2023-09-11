import Header from './Header/Header.jsx'
import Footer from "./Footer/Footer.jsx";
import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Statistics from "./Statistics/Statistics.jsx";

import {
    HashRouter as Router,
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
            <Route path ="/about" element={<About />}/>
            <Route path ="/statistics" element={<Statistics />}/>
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
