import React, { useContext, useEffect } from 'react'
import "./css/home.css"
import NoteItems from './NoteItems'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import noteContext from "../context/notes/noteContext"
import Modal from './Modal'
import Alert from './Alert'

export const Home = () => {

  const context = useContext(noteContext);
  const { notes, modal, showModal, modalValue, viewModal, getAllNotes, alert } = context;

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      getAllNotes()
    } else{
      navigate('/login')
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const addModal = ()=>{
    viewModal('','','','')
    showModal()
  }

  const handleLogout = ()=>{
    localStorage.removeItem("auth-token");
    
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        damping: 12,
        stiffness: 100,
      }
    }
  }

  return (
    <>
    <AnimatePresence>

      {modal && <Modal title={modalValue.title} description={modalValue.description} tags={modalValue.tags} />}
    </AnimatePresence>
      {alert.show && <Alert />}
      <div className='home'>
        <motion.div className="docker"
          initial={{ opacity: 0, x: -180 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.2
          }}>
          <motion.div className="add" onClick={addModal}
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              delay: 0.8
            }}>
            <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
          </motion.div>
        </motion.div>
        <div className="notes-container">
          <motion.div className="nav1"
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              delay: 0.2
            }}>
            <div className="logo">Rohan.</div>
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>Log Out</Link>
            </li>
          </motion.div>
          <div className="nav2">
            <div className="nav2-navbar">
              <div className="logo">Rohan.</div>
              <div className="hamburger">
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="search-bar">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" />
              </div>
              <motion.div className="add" onClick={addModal}
              initial={{y:400}}
              animate={{y:0}}
              transition={{
                type: 'spring',
                ease: 'ease',
                delay: 2,
                duration: 1
              }}>
                <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
              </motion.div>
            </div>
          </div>
          <motion.span className="heading"
            variants={container}
            initial="hidden"
            animate="visible">
            {[...'Notes'].map((letter) => (
              <motion.span key={letter} style={{ display: 'flex' }} variants={child}>{letter}</motion.span>
              ))}
          </motion.span>
          <motion.div className="items"
            animate={(i = 1) => ({
              transition: {
                staggerChildren: 0.4,
                delayChildren: 1
              }
            })}>
            {notes.length < 1 ? <motion.div className="no-notes"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
              delay:0.8,
              duration:0.5
            }}>There are no notes to show. Add a Note.</motion.div>:
            notes.map((note) => {
              return <NoteItems key={note._id} id={note._id} title={note.title} description={note.description} tags={note.tag} date={note.date.slice(0, 10)} />
            })}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Home
