"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import HomeNavbar from '@/components/HomeNavbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post('https://www.molify.xyz/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.accessToken);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
              {loading ? '✉️🕊️' : 'Login'}
            </button>
          </form>
          <br />
          <div className={styles.navLink}>
            <a href="/signup">Don't have an account? Signup</a>
          </div>
        </div>
      </div>
    </>
  );
}
