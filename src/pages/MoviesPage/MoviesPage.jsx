import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../requestAPI';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [serchParams, setSerchParams] = useSearchParams();
  const query = serchParams.get('query') ?? '';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      setSerchParams({ query: inputValue });
      setInputValue('');
    } else setSerchParams({});
  };

  useEffect(() => {
    if (query) {
      const getMovies = async () => {
        const results = await searchMovies(query);
        setMovies(results);
      };
      getMovies();
    }
  }, [query]);

  return (
    <div>
      <h1 className={styles.searchTitle}>Your movie search</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      {query && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
