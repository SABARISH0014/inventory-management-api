import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarChart3, Shield, Zap, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const featuresVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track inventory trends and performance with interactive charts and reports.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with automatic session management and data protection.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with smooth animations and instant data updates.",
  },
  {
    icon: Users,
    title: "Multi-user Support",
    description: "Collaborate seamlessly with team members across your organization.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  // Set light mode for home page
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // Animated background elements
  const backgroundElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 2,
  }));

  return (
    <div className="home-page">
      {/* Fixed Navigation Bar */}
      <nav className="home-navbar">
        <div className="navbar-brand">
          <span className="brand-logo">📦 Inventory</span>
        </div>
        <div className="navbar-links">
          <a href="#hero" className="nav-anchor">Home</a>
          <a href="#features" className="nav-anchor">Features</a>
        </div>
        <div className="navbar-buttons">
          <motion.button
            type="button"
            className="button button-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
          <motion.button
            type="button"
            className="button button-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </motion.button>
        </div>
      </nav>

      {/* Animated Background Elements */}
      <div className="animated-background">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="floating-shape"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: element.size,
              height: element.size,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + element.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        ))}
      </div>

      <motion.section
        className="home-hero-section"
        id="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <motion.div className="home-hero" variants={heroVariants}>
          <motion.p className="home-pretitle" variants={titleVariants}>
            ECFS Hackathon 2026
          </motion.p>
          <motion.h1 variants={titleVariants}>
            Smart Inventory
            <br />
            <span className="gradient-text">Management</span>
          </motion.h1>
          <motion.p className="home-description" variants={titleVariants}>
            Transform your business operations with intelligent inventory tracking,
            real-time analytics, and seamless supplier management. Built for modern enterprises.
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section
        className="home-features"
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={featuresVariants}
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <div className="container">
          <motion.div className="features-header" variants={featureCardVariants}>
            <h2>Powerful Features</h2>
            <p>Everything you need to manage your inventory efficiently</p>
          </motion.div>
          <motion.div className="features-grid" variants={featuresVariants}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="feature-card"
                  variants={featureCardVariants}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="feature-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon size={32} />
                  </motion.div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
