import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'services/fetchApi';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      const response = await fetchReviews(movieId);
      setReviews(response.results);
    };
    getReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.length !== 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id} className={styles.item}>
            <p className={styles.author}>Author: {author}</p>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <p>We don't hawe any reviews for this movie.</p>
      )}
    </ul>
  );
};

export default Reviews;
