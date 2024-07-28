import Link from 'next/link';
import styles from './navbar.module.scss';

export default function HomeNavbar() {
    return (
      <div className={styles.header}>
    <div className={styles.logo}>
      LinkMini
    </div>
    <div className={styles.menu}>
      <Link href="/" className={styles.link}>
        <div className={styles.title}>Home</div>
        <div className={styles.bar}></div>
      </Link>
    </div>
  </div>
    );
  }