const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        let token = null;

        // Check if the user is in the database
        // const foundUser = await postData.findOne({ email, password });

        // if (foundUser) {
        //     let payload = { email: email, password: password };
        //     token = jwt.sign(payload, 'reactempapp');
        // } else 
        if (email === 'admin' && password === 'admin') {
            // Check hardcoded admin credentials
            let payload = { email: email, password: password };
            token = jwt.sign(payload, 'reactexam');
        } else {
            // No matching credentials
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).send({ message: 'success', token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});





module.exports = router;