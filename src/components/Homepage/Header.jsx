import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/img/oser.ai-removebg white cropped.png";
import { RxHamburgerMenu } from "react-icons/rx";


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [homeLink, setHomeLink] = useState("#home");
    const [aboutLink, setAboutLink] = useState("#about");
    const [servicesLink, setServicesLink] = useState("#services");
    const [contactLink, setContactLink] = useState("#contact");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleLinkClick = (event, target) => {
            event.preventDefault();
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        };

        if (window.location.pathname !== '/') {
            setHomeLink('/');
            setAboutLink('/#about');
            setServicesLink('/#services');
            setContactLink('/#contact');
        } else {
            setHomeLink("#home");
            setAboutLink("#about");
            setServicesLink("#services");
            setContactLink("#contact");

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    handleLinkClick(e, this.getAttribute('href'));
                });
            });
        }

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleLinkClick);
            });
        };
    }, []);


    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <img src={logo} alt="oser.ai" className={styles.logo} onClick={() => window.location.href = "/"} />

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><a href={homeLink} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</a></li>
                    <li className={styles.navItem}><a href={aboutLink} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</a></li>
                    <li className={styles.navItem}><a href={servicesLink} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Services</a></li>
                    <li className={styles.navItem}><a href={contactLink} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                </ul>
            </nav>
            <div className={styles.rightNav}>
                <div className={styles.getStarted}>
                    <button className={styles.getStartedButton} onClick={() => window.location.href = "/coming-soon"}>Get Started</button>
                </div>
                <RxHamburgerMenu className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
        </header>
    );
};

export default Header;
