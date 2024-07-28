import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.scss';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        LinkMini
      </div>
      <div className={styles.menu}>
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className={styles.link}>
              <div className={styles.title}>Dashboard</div>
              <div className={styles.bar}></div>
            </Link>
            <div onClick={handleLogout} className={styles.link}>
              <div className={styles.title}>Logout</div>
              <div className={styles.bar}></div>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              <div className={styles.title}>Login</div>
              <div className={styles.bar}></div>
            </Link>
            <Link href="/signup" className={styles.link}>
              <div className={styles.title}>Signup</div>
              <div className={styles.bar}></div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
