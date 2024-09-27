import React, { useContext, useState } from 'react'
import './css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import Alert from './Alert'
import noteContext from "../context/notes/noteContext"

function Login() {

    const context = useContext(noteContext);
    const { alert, showAlert } = context;

    const [toggle, setToggle] = useState('hide')

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleToggle = () => {
        if (toggle === 'hide') {
            setToggle('show')
        } else {
            setToggle('hide')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save auth-token and redirect
            localStorage.setItem('auth-token', json.authToken);
            navigate("/home")

        }
        else if (json.success === false) {
            showAlert(json.error)
        }
        else {
            json.error.forEach(element => {
                showAlert(element.msg)
            });
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            {alert.show && <Alert />}
            <div className="login">
                {/* <div className="login-logo">Rohan.</div> */}
                <motion.div className="login-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 1,
                        duration: 1,
                        type: 'spring'
                    }}>
                    <div className="login-image">
                        <img src={process.env.PUBLIC_URL + `/images/login.png`} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h4>Log In</h4>
                        <div className="input-box">
                            <input type="e-mail" name='email' required="required" onChange={onChange} />
                            <span>E-mail</span>
                        </div>
                        <div className="input-box">
                            <input type={toggle === 'hide' ? 'password' : 'text'} name='password' required="required" onChange={onChange} />
                            <span>Password</span>
                            <div className="hide-show">
                                <i className={toggle === 'hide' ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={handleToggle} ></i>
                            </div>
                        </div>
                        <button className='submit-button' type='submit'>Login</button>
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </form>
                </motion.div>
            </div>
        </>
    )
}

export default Login
