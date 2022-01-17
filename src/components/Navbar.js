import React, {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    const [username, setUsername] = useState('')
    const logged_in = localStorage.getItem('token') ? true : false;
        if (logged_in) {
          fetch('http://localhost:8000/core/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(json => {
              setUsername(json.username) });
            ;
        }
    
    return(
        <nav className='navbar'>
            <Link to='/' className='logo-link'>
                <img src="/static/logo.png" alt='logo'/>
            </Link>
            <div className='links'>
                <Link to='/matches'>Mecze</Link>
                <Link to='/profile'>Profil</Link>
                <Link to='/pitches'>Boiska</Link>
                <Link to='/contact'>Kontakt</Link>  
            </div>
            <div className='status'>
                {logged_in ? `Witaj ${username} !`: <Link to='/login'>Zaloguj się!</Link>}
            </div>
            <div className='login'>
                <Link to='/login'>Zarejestruj się</Link>
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

