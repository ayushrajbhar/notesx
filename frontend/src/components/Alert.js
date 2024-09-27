import React, { useContext } from 'react'
import './css/alert.css'
import noteContext from "../context/notes/noteContext"

function Alert() {

    const context = useContext(noteContext);
    const { alert } = context;

    return (
        <div className="alert-container">
            <div className='alert'>
                <i className="fa-solid fa-circle-exclamation"></i>
                <div className="alert-msg">{alert.msg}</div>
            </div>
        </div>
    )
}

export default Alert
