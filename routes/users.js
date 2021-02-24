import express from 'express'
import User from '../models/User.model.js'
import UserStat from '../models/UserStat.model.js'
import UserPlays from '../models/UserPlays.model.js'
const router = express.Router()

router.route("/id").get((req, res) => {
  User.find({},{name: 1, id: 1, pp: 1, url: 1})
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err))
});

router.route("/id/:id").get((req, res) => {
  User.find({ id: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id))
});

router.route("/id/:id/stats").get((req,res) => {
    UserStat.find({ id: req.params.id })
        .then(stats => {
            res.json(stats)
        })
        .catch((err) => res.status(400).json("Error: " + err + req.params.id))
})

router.route("/id/:id/plays").get((req,res) => {
    UserPlays.find({ id: req.params.id })
        .then(plays => { 
            res.json(plays)
        })
        .catch((err) => res.status(400).json("Error: " + err + req.params.id))
})

export default router