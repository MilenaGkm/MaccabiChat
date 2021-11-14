const express = require('express')
const router = express.Router()
const User = require('../models/User')

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')

router.get("/users", async (req, res) => {
    const users = await User.find({})
    console.log(users);
    res.send(users)
})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    console.log(token);

    if (!token) {
        res.send("no token")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, massage: "you failed to authenticate" })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("user is authenticated!")
})

router.post("/login", async (req, res) => {
    const { username, password } = { ...req.body }
    // const newUser = new User({ ...req.body })
    // await newUser.save()
    // res.send(newUser)

    User.findOne({ username }, function (eer, user) {
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const id = user._id
                    const token = jwt.sign({ id }, "jwtSecret", {
                        expiresIn: 300,
                    })

                    res.json({ auth: true, token: token, user: user });
                    // res.send(user);
                } else {
                    res.json({ auth: false, message: "Wrong username/password combination!"});
                }
            })
        } else {
            res.json({ auth: false, message: "User doesn't exist"});
        }
    })
})

module.exports = router