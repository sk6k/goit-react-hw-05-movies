import { useEffect, useState } from 'react';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { fetchTrendingMovies } from 'services/fetchApi';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data.results);
      };
      getTrendingMovies();
    } catch (error) {
      setError(error);
    } finally {
    }
  }, []);

  return (
    <main>
      {error && <p>Try again</p>}
      <h2>Trending movies</h2>

      {trendingMovies && <MoviesList movies={trendingMovies} />}
    </main>
  );
};

export default Home;
