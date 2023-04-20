import Navigation from './components/nav/Navigation';
import logo from './logo.svg';
import './Munch.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Munch() {
  return (
      <>
      <Router>
            <Navigation />

            <Routes>
              <Route path="/" exact />
               </Routes>
      </Router>
    </>
  );
}

export default Munch;
