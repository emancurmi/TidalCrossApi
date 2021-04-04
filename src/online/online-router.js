const express = require('express')
const OnlineServices = require('./online-services')
const onlineRouter = express.Router()
const jsonParser = express.json()

onlineRouter
    .route('/')

    .get((req, res, next) => {
        OnlineServices.getConnection(req.app.get('db'))
            .then(
                res.json("connection found")
            )
            .catch(next)
    })

module.exports = onlineRouter