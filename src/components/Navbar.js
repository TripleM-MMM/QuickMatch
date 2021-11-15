import React, {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return(
        <nav className='navbar'>
            <Link to='/' className='logo-link'>
                <img src="logo.png"/>
            </Link>
            <div className='links'>
                <Link to='/matches'>Mecze</Link>
                <Link to='/profile'>Profil</Link>
                <Link to='/pitches'>Boiska</Link>
                <Link to='/contact'>Kontakt</Link>  
            </div>
            <div className='login'>
                <button to='/login'>Zaloguj się</button>
            </div>
        </nav>
    )
}

/*
function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
    return (
    <>
        <nav className='navbar'>
           <div className='navbar-container'>
             <Link to='/' className='navbar-logo'>
                 TRVL <i className='fab fa-typo3' />
             </Link>
             <div className='menu-icon' onClick={handleClick}>
                 <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
             </div>
             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                 <li className='nav-item'>
                     <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                         Home
                     </Link>
                 </li>
             </ul>
         </div>
     </nav>
     </>
    )
}
*/

export default Navbar


