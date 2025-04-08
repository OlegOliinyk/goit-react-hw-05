import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../requestAPI";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [serchParams, setSerchParams] = useSearchParams();
  const query = serchParams.get("query") ?? "";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      setSerchParams({ query: inputValue });
      setInputValue("");
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {query && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
