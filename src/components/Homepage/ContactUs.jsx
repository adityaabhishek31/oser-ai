// import React from 'react'
import styles from './ContactUs.module.css'
import ContactUsImg from '../../assets/img/contact_us.png'

const ContactUs = () => {
    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.contactContent}>
                <h2>Get in Touch</h2>
                <p>Let&apos;s talk about your needs and queries.</p>
                <p>We&apos;d love to hear from you! Reach out to us at <a href="mailto:info@oser.ai">info@oser.ai</a>.</p>
            </div>
            <div className={styles.contactImage}>
                <img src={ContactUsImg} alt="contact us" />
            </div>
        </section>
    )
}

export default ContactUs