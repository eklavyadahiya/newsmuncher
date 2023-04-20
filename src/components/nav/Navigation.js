import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Navigation() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
    <>
<nav className="navigation">

    <div className="navigation-container">
     <Link to="/" className="navigation-logo"> 
        Logo 
     </Link>
    </div>

    <div className="hamburger-menu" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
    </div>

    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>  
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
            </Link>
        </li>    
        <li className='nav-item'>  
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Throne
            </Link>
        </li>    
        <li className='nav-item'>  
            <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                Mobile Throne-200
            </Link>
        </li>    
    </ul>

</nav>
    </>
  )
}

export default Navigation