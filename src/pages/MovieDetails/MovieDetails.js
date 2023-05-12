import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { fetchMovieById } from 'services/fetchApi';
import { BackLink } from 'components/BackLink/BackLink';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showLoade, setShowLoader] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/home';

  useEffect(() => {
    const getMovieById = async movieId => {
      try {
        setShowLoader(true);
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        setError(error);
      } finally {
        setShowLoader(false);
      }
    };
    getMovieById(movieId);
  }, [movieId]);

  const poster = poster_path => {
    if (poster_path === null) {
      return 'https://via.placeholder.com/300sx450.jpg';
    }
    return `https://image.tmdb.org/t/p/w300${poster_path}`;
  };

  return (
    <main>
      {error && <p>Try again</p>}
      {showLoade && <div>Load info</div>}
      {movie && !showLoade && (
        <>
          <BackLink to={backLinkHref}>Back</BackLink>
          <div className={styles.container}>
            <div>
              <img
                src={`${poster(movie.poster_path)}`}
                alt={`${movie.title || movie.original_title || movie.name}`}
              />
            </div>
            <div>
              <div className={styles.description}>
                <h2>
                  {`${movie.title || movie.original_title || movie.name} `}
                  {`(${parseInt(movie.release_date)})`}
                </h2>
                <ul>
                  <li className={styles.item}>
                    <p className={styles.subtitle}>Vote / Votes</p>
                    <p className={styles.subtext}>
                      <span>{`${movie.vote_average.toFixed(1)}`}</span>
                      <span> / </span>
                      <span>{`${movie.vote_count}`}</span>
                    </p>
                  </li>
                  <li>
                    <p className={styles.subtitle}>Popularity</p>
                    <p className={styles.subtext}>{`${movie.popularity.toFixed(
                      1
                    )}`}</p>
                  </li>
                  <li>
                    <p className={styles.subtitle}>Overview</p>
                    <p className={styles.subtext}>{`${movie.overview}`}</p>
                  </li>
                  <li>
                    <p className={styles.subtitle}>Genres</p>
                    <p className={styles.subtext}>{`${movie.genres
                      .map(({ name }) => name)
                      .join(', ')}`}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <NavLink
                to="cast"
                state={{ from: location.state?.from ?? '/cast' }}
                className={styles.link}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                state={{ from: location.state?.from ?? '/reviews' }}
                className={styles.link}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default MovieDetails;
