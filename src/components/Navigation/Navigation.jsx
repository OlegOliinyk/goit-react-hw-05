import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink className={styles.navigationLink} to="/">
        Home
      </NavLink>
      <NavLink className={styles.navigationLink} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
