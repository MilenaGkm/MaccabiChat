const express = require('express');
const app = express();
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/maccabiChat', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

const port = 3001
app.listen( port, function(){
    console.log(`Running server on port ${port}`)
})
