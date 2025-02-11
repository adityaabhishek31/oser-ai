import styles from './Features.module.css';
import customerSupportImage from '../../assets/img/customer support.png';
import profitImage from '../../assets/img/profit.png';
import fleetImage from '../../assets/img/fleet.png';
import sustainCityImage from '../../assets/img/city charging.png';
import chargingImage from '../../assets/img/charging.png';
import marketIntelImage from '../../assets/img/market intel.png';

const features = [
    {
        id: 1,
        title: "Intelligent EV Charging Management",
        description:
            "Optimize your charging networks with our advanced, no-code SaaS platform. Manage charging stations, monitor energy consumption, and streamline operations effortlessly, ensuring seamless EV charging experiences across various locations.",
        image: chargingImage,
        cta: "Learn more",
        ctaLink: "/coming-soon",
        reverse: false,
    },
    {
        id: 2,
        title: "Fleet Management & Data Analytics",
        description:
            "Empower your fleet operations with real-time data insights and analytics. Track EV fleet performance, optimize charging schedules, and make data-driven decisions to enhance efficiency and reduce operational costs.",
        image: fleetImage,
        cta: "Get started",
        ctaLink: "/coming-soon",
        reverse: true,
    },
    {
        id: 3,
        title: "EV Solutions for Smart Cities",
        description:
            "Support the transition to smarter, greener cities with EV charging solutions tailored for urban landscapes. Our scalable platform integrates with smart city infrastructure to ensure accessibility, sustainability, and convenience.",
        image: sustainCityImage,
        cta: "Learn More",
        ctaLink: "/coming-soon",
        reverse: false,
    },
    {
        id: 4,
        title: "Market Intelligence & EV Adoption Tools",
        description:
            "Stay ahead in the e-mobility industry with actionable market insights and adoption tools. Leverage predictive analytics and trends to identify opportunities and drive EV adoption seamlessly.",
        image: marketIntelImage,
        cta: "Go to Dashboard",
        ctaLink: "/coming-soon",
        reverse: true,
    },
    {
        id: 5,
        title: "AI/ML-Enhanced Customer Support",
        description:
            "Revolutionize your customer service with AI/ML-powered chatbots. Provide instant assistance, resolve queries, and deliver localized support to ensure a superior user experience for EV owners and operators.",
        image: customerSupportImage,
        cta: "Get started",
        ctaLink: "/coming-soon",
        reverse: false,
    },
    {
        id: 5,
        title: "Flexible Payment & Subscription Plans",
        description:
            "Offer your customers a variety of payment options, including contactless transactions and subscription models. Cater to frequent users and fleet owners with competitive pricing and priority access to charging networks.",
        image: profitImage,
        cta: "Pricing",
        ctaLink: "/coming-soon",
        reverse: true,
    },
];

const Features = () => {
    return (
        <section className={styles.featuresSection} id="services">
            {features.map((feature) => (
                <div
                    key={feature.id}
                    className={`${styles.featureContainer} ${feature.reverse ? styles.reverse : ""
                        }`}
                >
                    <div className={styles.featureText}>
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                        <a href={feature.ctaLink} className={styles.ctaButton}>
                            {feature.cta}
                        </a>
                    </div>
                    <div className={styles.featureImage}>
                        <img src={feature.image} alt={feature.title} />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Features;
