import Header from '../components/Homepage/Header';
import styles from './Homepage.module.css';
import Footer from '../components/Homepage/Footer';
import { Typewriter } from 'react-simple-typewriter';
import StationImage from '../assets/img/EV+charging.png'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import image1 from '../assets/img/demo img/img- (1).jpg';
// import image2 from '../assets/img/demo img/img- (2).jpg';
// import image3 from '../assets/img/demo img/img- (3).jpeg';
// import image4 from '../assets/img/demo img/img- (4).jpg';
// import image5 from '../assets/img/demo img/img- (5).jpeg';
import Features from '../components/Homepage/Features';
import ContactUs from '../components/Homepage/ContactUs';
import { useEffect } from 'react';
import {Helmet} from "react-helmet";


const Homepage = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState({}, document.title, window.location.pathname);
                }, 500);
            }
        }
    }, []);

    return (
        <div id="home" className={styles.homepage}>
            <Helmet><title>Home | Oser.ai</title></Helmet>
            <Header />
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1><span className={styles.textGradient}>The Future</span> of Electric Mobility</h1>
                    <p className={styles.heroDescription}>Advanced SaaS solutions for{' '}
                        <span className={styles.heroDescriptionTypewriter}>
                            <Typewriter
                                words={[
                                    'revolutionizing EV infrastructure',
                                    'delivering smarter mobility solutions',
                                    'empowering a greener tomorrow',
                                    'optimizing charging networks',
                                    'driving sustainable innovation',
                                    'enabling seamless EV adoption',
                                    'enhancing fleet management efficiency',
                                    'accelerating e-mobility transformation'
                                ]}
                                loop={0}
                                cursor
                                cursorStyle='|'
                                typeSpeed={65}
                                deleteSpeed={45}
                                delaySpeed={1500}
                                cursorColor='black'
                            />
                        </span>
                    </p>
                    <div className={styles.ctaButtons}>
                        <a href="#services" className={styles.ctaButtonTypeA}>Explore Services</a>
                        <a href="#contact" className={styles.ctaButtonTypeB}>Contact Us</a>
                    </div>
                    <img src={StationImage} alt="EV Charging Station" className={styles.heroImage} />
                </div>
            </section>

            <section id="about" className={styles.aboutSection}>
                <h2>About Us</h2>
                <p>
                    At Oser.ai, we empower the e-mobility industry with advanced SaaS solutions designed for EV charging manufacturers and charging network operators. Our platform offers scalability, flexibility, and seamless integration, enabling businesses to efficiently manage their EV infrastructure.
                </p>
                <p>With a focus on innovation and sustainability, we aim to accelerate EV adoption and contribute to a greener, cleaner future. From effective fleet management to smart city solutions, our no-code software is built to meet the dynamic needs of the mobility sector.</p>
                <p>Let us help you drive the future of electric mobility — together.
                </p>
                <button className={styles.learnMoreButton} onClick={() => window.location.href = "/coming-soon"}>Learn More</button>
            </section>



            {/* <section id="services" className={styles.servicesSection}>
                <h2>Our Services</h2>
                <div className={styles.servicesList}>
                    <div className={styles.serviceItem}>Service 1</div>
                    <div className={styles.serviceItem}>Service 2</div>
                    <div className={styles.serviceItem}>Service 3</div>
                </div>
            </section> */}

            {/* <section className={styles.featuresSection}>
                <Carousel
                    showArrows
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    showStatus={false}
                    showIndicators
                    emulateTouch
                    stopOnHover
                >
                    {[image1, image2, image3, image4, image5].map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Feature ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </section> */}
            <Features id="services" />
            <ContactUs />
            <Footer />
        </div>
    );
};

export default Homepage;