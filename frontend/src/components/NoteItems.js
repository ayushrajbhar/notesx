import React, {useContext} from 'react'
import './css/noteitems.css'
import { motion } from 'framer-motion'
import noteContext from "../context/notes/noteContext"


function NoteItems(props) {

    const context = useContext(noteContext);
    const { deleteNote, showModal, viewModal } = context;

    const handleClick = ()=>{
        viewModal(props.id, props.title, props.description, props.tags)
        showModal()
    }

    const colors = ["#feffb9", "#ffff6f", "#ffbb5c", "#ff993f", "#a1ec75", "#79fffd", "#75ccff", "#ffb7e4", "#c2a6ff"]
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <>
            <motion.div className='item' style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                initial={{ opacity: 0, y: 400 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: 'spring',
                    ease: 'easeIn',
                    duration: 1,
                    delay: 0.8
                }}
            >
                <div className="title">{props.title.length > 20 ? props.title.slice(0, 20) + '...' : props.title}</div>
                <div className="tags">
                    {props.tags.map((tag) => {
                        return <div key={props.tags.indexOf(tag)} className="tag">{tag}</div>
                    })}
                </div>
                <div className="description">{props.description.length > 100 ? props.description.slice(0, 100) + '...' : props.description}</div>
                <div className="item-docker">
                    <div className="date">{month[Number(props.date.slice(5, 7)) - 1]} {props.date.slice(8, 10)}, {props.date.slice(0, 4)}</div>
                    {/* <div className="date">May 4, 2023</div> */}
                    <div className="options">
                        <motion.div className="option" onClick={() => { deleteNote(props.id) }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                ease: 'easeOut',
                                delay: 1.6,
                                duration: 0.3
                            }}>
                            <i className="fa-solid fa-trash" style={{ color: '#ffffff' }}></i>
                            {/* <i className="fa-regular fa-trash-can" style={{color: '#ffffff'}}></i> */}
                        </motion.div>
                        <motion.div className="option" onClick={handleClick}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                ease: 'easeOut',
                                delay: 1.8,
                                duration: 0.3
                            }}>
                            <i className="fa-solid fa-pen" style={{ color: '#ffffff' }}></i>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default NoteItems
