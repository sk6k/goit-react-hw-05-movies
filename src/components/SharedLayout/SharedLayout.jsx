import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <NavLink to="/" className={styles.link} end>
            Home
          </NavLink>
          <NavLink to="/movies" className={styles.link}>
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
