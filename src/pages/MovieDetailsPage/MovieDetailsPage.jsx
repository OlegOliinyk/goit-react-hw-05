import { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../requestAPI';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movie');

  const posterUrlBase = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchMovieDetails(movieId).then(setMovie);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  if (!movie) return;

  return (
    <div className={styles.details}>
      <Link className="navigationLink" to={backLink.current}>
        Go back
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={styles.detailsBox}>
        <img
          src={movie.poster_path && `${posterUrlBase}${movie.poster_path}`}
          alt={movie.title}
          width={350}
        />
        <div>
          <h1 className={styles.detailsBoxInf}>{movie.title}</h1>
          <p className={styles.detailsBoxInf}>
            User score : {`${(movie.vote_average * 10).toFixed(0)}%`}
          </p>
          <p className={styles.detailsBoxInf}>Overview : {movie.overview}</p>
          <p className={styles.detailsBoxInf}>
            Genres: {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </div>
      <div className={styles.detailsAdditional}>
        <h2>Additional information</h2>
        <div>
          <Link className="navigationLink" to="cast">
            Cast
          </Link>
          <Link className="navigationLink" to="reviews">
            Reviews
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet className={styles.detailsAdditionalOutlet} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
