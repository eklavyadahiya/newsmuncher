// src/components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav id='nav' className="navbar bg-blue-700 p-4">
      <ul className="flex justify-between">
        {/* <li>
          <Link to="/" className="text-white hover:underline">
            Trending
          </Link>
        </li> */}
        <li>
          <Link to="/IN/latest" className="text-white hover:underline header-btn">
            Home
          </Link>
        </li>
        <li>
          <Link to="https://github.com/eklavyadahiya/newsmuncher" target="_blank" className="text-white">
            News Muncher
          </Link>
        </li>

      </ul>
    </nav>
    
  );
}

export default Navbar;
