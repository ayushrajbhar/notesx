const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Rohanhassignedthetokenwiththissecret'


// ROUTE 1: Create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [

    // Validating name, email and password
    body('name', 'Name must be atleast 3 to 10 characters').isLength({ min: 3, max: 10 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 to 15 characters long, containing atleast 1 lowercase and upperase character').isLength({ min: 5, max: 15 }).not().isUppercase().not().isLowercase()

], async (req, res) => {

    let success = false;

    // If any errors, return Bad request status and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        // Check if a user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'A user with this email already exists' });
        }

        // Hashing and adding salt to the password
        const salt = await bcrypt.genSalt(10);
        securePassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })


        // Giving a jwt authentication token

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some error occured')
    }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [

    // Validating name, email and password
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Please enter the password').exists()

], async (req, res) => {

    let success = false;

    // If any errors, return Bad request status and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const {email, password} = req.body

    try {

        // Checking if the email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: 'Please enter the correct credentials' });
        }

        // Comparing the password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({ success, error: 'Please enter the correct credentials' });
        }

        // Giving a jwt authentication token
        
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }

})


// ROUTE 3: Getting a logged in user details: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }

})


module.exports = router