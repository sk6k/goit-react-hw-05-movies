import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [movieName, setMovieName] = useState('');

  const inputHandler = e => {
    setMovieName(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (movieName === '') {
      alert('Please enter something');
      return;
    }

    onSubmit(movieName);
    setMovieName('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          value={movieName}
          onChange={inputHandler}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
