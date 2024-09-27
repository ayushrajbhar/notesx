import React, { useContext, useState } from 'react'
import "./css/modal.css"
import noteContext from "../context/notes/noteContext"
import { motion } from 'framer-motion'

function Modal(props) {

    const context = useContext(noteContext);
    const { hideModal, addNote, modalValue, editNote } = context;

    const [note, setNote] = useState({ title: "Untitled", description: "", tag: "General" });
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)

    const handleClick = (e) => {
        document.querySelector('.save-btn').innerHTML = 'Saved'
        setTimeout(() => {
            document.querySelector('.save-btn').innerHTML = 'Save'
        }, 2000);
        e.preventDefault();

        // Here if modalValue.id = '' the add else edit
        if (modalValue.id === '') {
            addNote(note.title, note.description, note.tag);
        } else {
            const tag = document.getElementById('tag').value
            editNote(modalValue.id, title, description, tag);
        }
    }

    const onChange = (e) => {
        if (e.target.name==='title') {
            setTitle(e.target.value)
        } else if (e.target.name==='description') {
            setDescription(e.target.value)
        }
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="modal">
                <motion.div className='modal-inner'
                    initial={{ opacity: 0, y: 400 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 400 }}
                    transition={{
                        type: 'spring',
                        duration: 0.6
                    }}>
                    <div className="toolbar">
                        <div className="row1">
                            <input type="text" name="title" placeholder='Untitled' onChange={onChange} value={title} />
                            <div className="right">
                                <button className="save-btn" onClick={handleClick}>Save</button>
                                <i className="fa-solid fa-xmark" onClick={hideModal}></i>
                            </div>
                        </div>
                        <div className="row2">
                            <label htmlFor="tag">Tags:</label>
                            <input id='tag' type="text" className="note-tag" name='tag' placeholder='Add a tag..' onChange={onChange} />
                            {props.tags && props.tags.map((tag) => {
                                return <div key={props.tags.indexOf(tag)} className="note-tag">{tag}</div>
                            })}
                        </div>
                    </div>
                    <textarea className="note-body" name="description" onChange={onChange} placeholder='Type something...' value={description}></textarea>
                </motion.div>
        </div>
    )
}

export default Modal
