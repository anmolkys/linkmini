"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css'; // Adjust path if necessary

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [newLongURL, setNewLongURL] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`https://www.molify.xyz/mylinks`, {
          headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (response.status === 200) {
          setLinks(response.data);
        } else {
          console.error('Error fetching links:', response.status, response.data);
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert('Error fetching links');
        router.push('/login');
      }
    };

    fetchLinks();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(`https://www.molify.xyz/i`, {
        longURL: newLongURL,
      }, {
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`https://www.molify.xyz/mylinks`, {
          headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json'
          },
        });
        setLinks(updatedResponse.data);
        setSuccessMessage('Link successfully generated!');
        setNewLongURL('');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error generating link');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Links</h1>

      <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Long URL:
          <input 
            type="url" 
            value={newLongURL} 
            onChange={(e) => setNewLongURL(e.target.value)} 
            required 
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Generate Link
        </button>
      </form>

      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      
      <hr className={styles.hr} />
      
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeader}>Short URL</th>
            <th className={styles.tableHeader}>Long URL</th>
            <th className={styles.tableHeader}>Visitor Count</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td className={styles.tableCell}>
                <a href={`https://www.molify.xyz/i/${link.shortURL}`} target="_blank" rel="noopener noreferrer">
                  {link.shortURL}
                </a>
              </td>
              <td className={styles.tableCell}>{link.longURL}</td>
              <td className={styles.tableCell}>{link.visitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
