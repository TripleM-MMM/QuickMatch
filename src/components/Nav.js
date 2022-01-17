import PropTypes from 'prop-types';
import './Navbar.css';



function Nav(props) {

  const logged_out_nav = (
      
    <ul>
      <li onClick={() => props.display_form('login')}>Logowanie</li>
      <li onClick={() => props.display_form('signup')}>Rejestracja</li>
      
    </ul>

  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>Wyloguj się</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};