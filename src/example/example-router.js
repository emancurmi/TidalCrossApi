const path = require('path')
const express = require('express')
const ExampleServices = require('./example-services')

const exampleRouter = express.Router()
const jsonParser = express.json()


exampleRouter
    .route('/')
    .get((req, res, next) => {
        var qexampleid = req.query.exampleid || "";
        if (qexampleid != "") {
            ExampleServices.getAllExamplesbyexampleid(req.app.get('db'), qexampleid)
                .then(steps => {
                    res.json(examples)
                })
                .catch(next)
        }
        else {
            ExampleServices.getAllExamples(req.app.get('db'))
                .then(steps => {
                    res.json(examples)
                })
                .catch(next)
        }
    })
    .post(jsonParser, (req, res, next) => {
        const { element, placement, title, content } = req.body
        const newExample = { element, placement, title, content }

        for (const [key, value] of Object.entries(newExample)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newExample.title = title
        ExampleServices.insertExample(
            req.app.get('db'),
            newStep
        )
            .then(example => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${example.id}`))
                    .json(example)
            })
            .catch(next)
    })

exampleRouter
    .route('/:example_id')
    .all((req, res, next) => {
        ExampleServices.getById(
            req.app.get('db'),
            req.params.example_id
        )
            .then(example => {
                if (!example) {
                    return res.status(404).json({
                        error: { message: `Step doesn't exist` }
                    })
                }
                res.example = example
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.example.id,
            element: res.example.element,
            placement: res.example.placement,
            title: res.example.title,
            content: res.example.content,
        })
    })
    .delete((req, res, next) => {
        ExampleServices.deleteExample(
            req.app.get('db'),
            req.params.example_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { element, placement, title, content } = req.body
        const exampleToUpdate = { element, placement, title, content }
        const numberOfValues = Object.values(exampleToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        ExampleServices.updateExample(
            req.app.get('db'),
            req.params.example_id,
            exampleToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = exampleRouter