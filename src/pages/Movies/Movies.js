import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { fetchMovieByName } from 'services/fetchApi';

import { MoviesList } from 'components/MoviesList/MoviesList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  const handleFormSubmit = search => {
    setSearchParams({ query: search });
    setError(null);
  };

  useEffect(() => {
    if (query === null) return;
    async function getMovieByName() {
      try {
        const movieData = await fetchMovieByName(query);
        setMovies(movieData.results);

        if (movieData.results.length === 0) {
          alert(`${query} not found`);
          return;
        } else {
          navigate(`/movies/?query=${query}`);
        }
      } catch (error) {
        setError(error);
      }
    }
    getMovieByName();
  }, [navigate, query]);

  return (
    <main>
      {error && <p>Try again</p>}
      <SearchBar onSubmit={handleFormSubmit} />

      {movies && <MoviesList movies={movies} />}

      <Outlet />
    </main>
  );
};
export default Movies;
