import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../requestAPI';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetchMovieCast(movieId).then(setCast);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  return (
    <>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
      <ul className={styles.castList}>
        {cast.map(({ id, name, profile_path }) => (
          <li className={styles.castItem} key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
            />
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
