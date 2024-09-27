import React, { useState, useEffect } from "react";
import './css/header.css'
import { motion } from 'framer-motion'
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";


const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.6 * i
    }
  })
}

const child = {
  hidden: {
    opacity: 0,
    y: 400,
    transition: {
      // type: 'spring',
      damping: 12,
      stiffness: 100,
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // type: 'spring',
      damping: 12,
      stiffness: 100,
    }
  }
}


const Header = () => {

  const [playMarquee, setPlayMarquee] = useState(false);

  useEffect(() => {
    setPlayMarquee(true);
  }, []);
  return (
    <>
      <Navbar />
      <motion.div className="banner">
        <BannerRowTop title={"best"} />
        <BannerRowCenter title={"experience"} playMarquee={playMarquee} />
        <BannerRowBottom title={"notes"} />
        <motion.div className="transition-image final"
          initial={{ y: 800 }}
          animate={{ y: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.8,
            delay: 0.1
          }}>
          <img className='main-image' src={process.env.PUBLIC_URL + `/images/image4.png`} alt='' />
          <img className='main-image' src={process.env.PUBLIC_URL + `/images/image5.png`} alt='' />
        </motion.div>
      </motion.div>
    </>
  );
};

const AnimatedLetters = ({ title, disabled }) => (
  <motion.span className="row-title"
    variants={disabled ? null : container}
    initial="hidden"
    animate="visible"
  >
    {[...title].map((letter) => (
      <motion.span key={Math.random().toString(16).slice(2)} className="row-letter" variants={child}>{letter}</motion.span>
    ))}
  </motion.span>
);

const BannerRowTop = ({ title }) => {
  return (
    <div className="banner-row">
      <div className="row-col">
        <AnimatedLetters title={title} />
      </div>
      <motion.div className="row-col"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
          delay: 0.4
        }}>
        <span className="row-message">
          We are providing you with a private and secure notebook on the cloud, asscessible from any device.
        </span>
      </motion.div>
    </div>
  );
};

const BannerRowCenter = ({ title, playMarquee }) => {
  return (
    <div className={`banner-row marquee  ${playMarquee && "animate"}`}>
      <div className="marquee__inner">
        <AnimatedLetters title={title} disabled />
        <AnimatedLetters title={title} />
        <AnimatedLetters title={title} />
        <AnimatedLetters title={title} disabled />
      </div>
    </div>
  );
};

const BannerRowBottom = ({ title }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup")
  }

  return (
    <div className={"banner-row center"}>
      <motion.div className="scroll" onClick={handleClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: [0.6, 0.01, -0.05, 0.95], duration: 1, delay: 1 }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 1, delay: 1.8 }}>Get</motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 1, delay: 1.8 }}>Started</motion.span>
      </motion.div>
      <AnimatedLetters title={title} />
    </div>
  );
};

export default Header
