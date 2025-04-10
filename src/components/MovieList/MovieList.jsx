import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  console.log(movies);

  return (
    <ul className={styles.movieslist}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.moviesitem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieposter}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
