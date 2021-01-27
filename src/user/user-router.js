const path = require('path')
const express = require('express')
const UserServices = require('./user-services')

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
    .route('/')

    .get((req, res, next) => {
        var quseremail = req.query.useremail || "";
        var quserrole = req.query.userrole || "";

        if (quseremail != "") {
            UserServices.getByUserEmail(req.app.get('db'), quseremail)
                    .then(users => {
                        res.json(users)
                    })
                    .catch(next)
        }
        if (quserrole != "") {
            UserServices.getByUserRole(req.app.get('db'), quserrole)
                .then(users => {
                    res.json(users)
                })
                .catch(next)
        }
        else {
            UserServices.getAllUsers(req.app.get('db'))
                .then(users => {
                    res.json(users)
                })
                .catch(next)
        }
    })

    .post(jsonParser, (req, res, next) => {
        const { username, useremail, userphone, userpassword, userrole } = req.body
        const newUser = { username, useremail, userphone, userpassword, userrole }

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        UserServices.getByUserEmailOnly(req.app.get('db'), newUser.useremail)
            .then(user => {
                if (user.length === 0) {
                    UserServices.insertUser(req.app.get('db'), newUser)
                        .then(user => {
                            res
                                .status(201)
                                .location(path.posix.join(req.originalUrl + `/${user.userid}`))
                                .json(user)
                        })
                        .catch(next)
                }
                else {
                    return res.status(400).json({
                        error: { message: `Email is Registered` }
                    })

                }
            })
    })

userRouter

    .route('/:userid')

    .all((req, res, next) => {
        UserServices.getById(req.app.get('db'), req.params.userid)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            userid: res.user.userid,
            username: res.user.username,
            useremail: res.user.useremail,
            userphone: res.user.userphone,
            userpassword: res.user.userpassword,
            userrole: res.user.userrole
        })
    })

    .delete((req, res, next) => {
        UserServices.deleteUser(
            req.app.get('db'),
            req.params.userid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        //console.log(req.body)
        const { username, useremail, userphone, userpassword } = req.body
        const userToUpdate = { username, useremail, userphone, userpassword }
        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }
        if (req.params.userid != 1) {
            UserServices.updateUser(
                req.app.get('db'),
                req.params.userid,
                userToUpdate
            )
                .then(numRowsAffected => {
                    res.status(200).json({})
                })
                .catch(next)
        }
        else {
            return res.status(400).json({
                error: {
                    message: "User is a Demo User"
                }
            })
        }
    })

module.exports = userRouter