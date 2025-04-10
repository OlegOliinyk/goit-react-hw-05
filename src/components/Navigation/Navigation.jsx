import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink className="navigationLink" to="/">
        Home
      </NavLink>
      <NavLink className="navigationLink" to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
