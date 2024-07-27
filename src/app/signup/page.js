"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';
import Navbar from '@/components/navbar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <>
    <Navbar></Navbar>
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
          <button type="submit" className={styles.button}>Signup</button>
        </form>
        <br></br>
        <div className={styles.navLink}>
          <a href="/login">Have an account? Login</a>
        </div>
      </div>
    </div>
    </>
  );
}
