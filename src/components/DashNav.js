import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.scss';
import { useRouter } from 'next/navigation';
export default function DashNav() {

    const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push("/login")
    
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        LinkMini
      </div>
      <div className={styles.menu}>
        {isLoggedIn ? (
          <>
            <Link href="/" className={styles.link}>
              <div className={styles.title}>Home</div>
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
            <Link href="/about" className={styles.link}>
              <div className={styles.title}>About</div>
              <div className={styles.bar}></div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
