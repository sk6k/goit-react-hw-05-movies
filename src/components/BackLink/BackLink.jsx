import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import styles from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={styles.backlink}>
      <HiArrowLeft size="24" />
      {children}
    </Link>
  );
};

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
};
