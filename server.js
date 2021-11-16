const express = require('express');
const app = express();
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const cors = require("cors");
const http = require('http').Server(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/maccabiChat', { useNewUrlParser: true, useUnifiedTopology: true })

// const io = require('socket.io')(http);

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)


let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

const port = 3001

app.listen(port, function () {
  console.log(`Running server on port ${port}`)
})
