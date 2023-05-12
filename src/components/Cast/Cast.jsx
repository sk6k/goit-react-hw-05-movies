import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services/fetchApi';
import styles from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      const response = await fetchCast(movieId);

      setCast(response.cast);
    };
    getCast();
  }, [movieId]);

  if (!cast) {
    return;
  }

  const poster = profile_path => {
    if (profile_path === null) {
      return 'https://via.placeholder.com/300sx450.jpg';
    }
    return `https://image.tmdb.org/t/p/w300${profile_path}`;
  };

  return (
    <>
      <ul className={styles.list}>
        {cast.length !== 0 ? (
          cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <img
                src={`${poster(profile_path)}`}
                alt="name"
                className={styles.img}
              />
              <p className={styles.name}>{name}</p>
              <p className={styles.character}>Character: {character}</p>
            </li>
          ))
        ) : (
          <p>No info</p>
        )}
      </ul>
    </>
  );
};

export default Cast;
