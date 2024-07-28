"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';
import HomeNavbar from '@/components/HomeNavbar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post('https://www.molify.xyz/signup', {
        email,
        username,
        password,
      });
      router.push('/login');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Signup</h1>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <label className={styles.label}>Email:
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.input} 
                required 
              />
            </label>
            <label className={styles.label}>Username:
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className={styles.input} 
                required 
              />
            </label>
            <label className={styles.label}>Password:
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={styles.input} 
                required 
              />
            </label>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? '⚡' : 'Signup'}
            </button>
          </form>
          <br />
          <div className={styles.navLink}>
            <a href="/login">Have an account? Login</a>
          </div>
        </div>
      </div>
    </>
  );
}
