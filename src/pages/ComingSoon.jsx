import React, { useState } from 'react';
import styles from './ComingSoon.module.css';
import logo from '../assets/img/oser.ai-removebg dark bg cropped.png'; // Replace with your logo
import Header from '../components/Homepage/Header';
import { Helmet } from 'react-helmet';
// https://script.google.com/macros/s/AKfycbz4WiDevZhg9P5UU5gt_lz1wE3AFklcUlvbBJbNHqa_mmGkDAVbQRZoOeVUAPSswGwb/exec
const ComingSoon = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        setMessage('Checking availability, please wait...');
        event.preventDefault();
        try {
            console.log(import.meta.env.VITE_GOOGLE_SCRIPT_URL)
            const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email }),
            });
            if (response.ok) {
                setMessage('Thank you! You will be notified.');
                setEmail('');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className={styles.comingSoonPage}>
             <Helmet><title>Coming Soon | Oser.ai</title></Helmet>
            <Header />
            <div className={styles.comingSoon}>
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <img src={logo} alt="Oser.ai Logo" className={styles.logo} />
                        <h1 className={styles.title}>We’re Powering the Future</h1>
                        <p className={styles.subtitle}>
                            Something amazing is on the way! 🚀
                            Be the first to experience the next generation of e-mobility solutions.
                        </p>
                        <form className={styles.notifyForm} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email to stay updated"
                                className={styles.inputField}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className={styles.notifyButton}>Notify Me</button>
                        </form>
                        {message && <p className={styles.privacyNote}>{message}</p>}
                        <p className={styles.privacyNote}>We value your privacy. No spam, just innovation.</p>
                    </div>
                    {/* <footer className={styles.footer}>
                        <p>© 2025 Fortitude Mobility | All Rights Reserved</p>
                    </footer> */}
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
