"use client";
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Navbar from '@/components/Navbar';

export default function Home() {
  const [waifu, setWaifu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaifu = async () => {
      try {
        const response = await fetch('https://waifu.up.railway.app/');
        const data = await response.json();
        setWaifu(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching waifu:', error);
        setLoading(false);
      }
    };

    if (loading) {
      fetchWaifu();
    }
  }, [loading]);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.background}></div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.left}>
              <h4>Random Character</h4>
              {loading ? (
                <p>Loading...</p>
              ) : waifu ? (
                <>
                  <img
                    src={waifu.url}
                    alt={waifu.name}
                    className={styles.placeholderImage}
                  />
                  <p>{"⚡ "+waifu.name}</p>
                </>
              ) : (
                <p>Failed to load waifu</p>
              )}
            </div>
            <div className={styles.right}>
              <h2>Fast, Free, and Efficient URL Shortening Service</h2>
              <p>
                Our URL shortening service provides a quick and reliable way to shorten your links. 
                Enjoy a user-friendly dashboard to manage your links efficiently.
              </p>
              <ul>
                <li>- Completely Free</li>
                <li>- Fast URL Shortening</li>
                <li>- Easy to Use Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
