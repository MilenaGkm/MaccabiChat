const express = require('express')
const router = express.Router()

router.get('/lol', (req, res) => {
    console.log("bitch")
    res.send("lol.i.")
})

module.exports = router