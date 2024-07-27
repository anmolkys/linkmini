import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>Molify</div>
        </Link>
        <div className={styles.links}>
          <Link href="/login">
            <div className={styles.link}>Login</div>
          </Link>
          <Link href="/signup">
            <div className={styles.link}>Signup</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
