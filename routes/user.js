const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { User } = require('../models/user');

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
        User.find({ email }, async(error, users) => {
            if (error) return res.send({ status: 'error', error: error.message });
            if (users.length > 0) {
                return res.send({ status: 'error', error: 'user already exixsts' });
            } else {
                const user = new User(userdata);
                const result = user.save();
                return res.send({ status: 'success', data: { user: user } });
            }
        })
    } catch (er) {
        console.log(er);
        res.send({ status: 'error', error: er.message });
    }
})

module.exports = router;