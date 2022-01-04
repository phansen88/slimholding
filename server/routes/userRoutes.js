/*
const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.get('/u/:userId', verifyJWT, (req, res) => {
  const username = req.params.userId;

  User.findOne({ username: username })
    .then((dbUser) =>
      res.json({
        username: dbUser.username,
        canEdit: dbUser.username == req.user.username,
        pfp: dbUser.pfp,
        bio: dbUser.bio,
        createdGroups: dbUser.createdGroups,
      })
    )
    .catch((err) =>
      res.json({
        username: 'User Not Found',
        canEdit: false,
        pfp: '',
        bio: '',
      })
    );
});

module.exports = router;
*/
