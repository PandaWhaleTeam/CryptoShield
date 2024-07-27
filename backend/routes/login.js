const e = require('express');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login Page!')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // TODO: Authentication logic
    // TODO: Check credentials in database --> make queries here!

    if (username === 'testuser' && password === 'password') {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }

})


module.exports = router;
