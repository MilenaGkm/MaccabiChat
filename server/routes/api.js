const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Conversation = require('../models/Conversation')
const Message = require('../models/Message')

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')

router.get("/users", async (req, res) => {
  const users = await User.find({}, function (err, users) {
  })
  res.send(users)
})

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId
  User.findById({ _id: userId }, function (err, user) {
    res.send(user)
  })
})

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  // console.log(token);

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
          res.json({ auth: false, message: "Wrong username/password combination!" });
        }
      })
    } else {
      res.json({ auth: false, message: "User doesn't exist" });
    }
  })
})

//new conv

router.post("/conversation", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/conversations/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/conversations/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});



//add message

router.post("/message", async (req, res) => {
  const newMessage = new Message(req.body);
  // console.log(newMessage);
  // res.end()

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get message

router.get("/message/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router