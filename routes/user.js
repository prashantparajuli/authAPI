const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { Users } = require('../models/user');

router.get('/', async(req, res) => {
    res.send('hello')
});

router.post('/register', async(req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hashSync(req.body.password, 12),
    }
    try {
        Users.find({ email: req.body.email }, async(error, users) => {
            if (error) return res.send({ status: 'error', error: error.message });
            if (users.length > 0) {
                return res.send({ status: 'error', error: 'user already exixsts' });
            } else {
                const user = new Users(userData);
                const result = user.save();
                return res.send({ status: 'success', data: { user: user } });
            }
        })
    } catch (er) {
        console.log(er);
        res.send({ status: 'error', error: er.message });
    }
})

router.post('/login', async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;


    const user = await Users.findOne({ email: email }).lean();

    if (!user) return res.json({ status: 'error', error: 'cannot find the user' })

    if (user && bcrypt.compareSync(password, user.password)) {
        const accessToken = await jwt.sign({
                _id: user._id,
                name: user.name,
                role: user.role
            },
            process.env.ACCESS_TOKEN, { expiresIn: '10d' }
        )
        res.json({ status: 'Success', message: 'logged in successfully', accesstoken: accessToken })
    } else {
        res.json({ status: 'error', error: 'invalid email/pass' });
    }
})

module.exports = router;