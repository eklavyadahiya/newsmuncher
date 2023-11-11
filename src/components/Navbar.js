// src/components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar bg-blue-500 p-4">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="text-white hover:underline">
            Trending
          </Link>
        </li>
        <li>
          <Link to="/IN/latest" className="text-white hover:underline">
            Latest
          </Link>
        </li>
      </ul>
    </nav>
    
  );
}

export default Navbar;
