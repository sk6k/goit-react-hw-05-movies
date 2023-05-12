import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './MoviesList.module.css';
// import {
//   MoviesGallegy,
//   Container,
//   MovieName,
//   MovieItem,
//   Link,
// } from './MoviesList.styled';

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  const poster = poster_path => {
    if (poster_path === null) {
      return 'https://via.placeholder.com/300sx450.jpg';
    }
    return `https://image.tmdb.org/t/p/w300${poster_path}`;
  };
  return (
    <div className={styles.container}>
      <ul className={styles.gallery}>
        {movies.map(
          ({ id, original_title, original_name, name, title, poster_path }) => (
            <li key={id} className={styles.item}>
              <NavLink
                to={`/movies/${id}`}
                state={{ from: location }}
                className={styles.link}
              >
                <img
                  src={`${poster(poster_path)}`}
                  alt={`${title || original_title || name}`}
                />
                <p className={styles.name}>{original_title || original_name}</p>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};
