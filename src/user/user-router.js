const path = require('path')
const express = require('express')
const UserServices = require('./user-services')
const { exception } = require('console')
const { query } = require('express')

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
    .route('/')
    .get((req, res, next) => {
        var quseremail = req.query.useremail || "";
        var quserphone = req.query.userphone || "";
        var quserpassword = req.query.userpassword || "";

        if (quserphone != "" || quseremail != "") {
            if (quserpassword != "") {
                UserServices.getByUserPhone(req.app.get('db'), quserphone, quserpassword)
                    .then(users => {
                        res.json(users)
                    })
                    .catch(next)
            }
            else {
                throw Error("Pin is rquired");
            }
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
        const { username, userphone, useremail, userpassword } = req.body
        const newUser = { username, userphone, useremail, userpassword }

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
                                    error: { message: `User is Registered` }
                                })
                            }
                        })
                        .catch(next)
                
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
            userphone: res.user.userphone,
            useremail: res.user.useremail,
            userpassword: res.user.userpassword
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
        const { username, userphone, userpassword } = req.body
        const userToUpdate = { username, userphone, userpassword }
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