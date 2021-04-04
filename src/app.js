require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { ADDRESS, PORT, NODE_ENV, DATABASE_URL } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const app = express()

const helpRouter = require('./help/help-router')
const exampleRouter = require('./example/example-router')
const userRouter = require('./user/user-router')
const orderRouter = require('./order/order-router')
const onlineRouter = require('./online/online-router')

const { data } = require('./logger')


let whitelist = [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://www.tidalcross.com',
    'https://tidalcross.com',
    'https://tidalcrossapp.vercel.app',
    'https://tidalcrossapi.herokuapp.com']

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
}))

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = `The CORS policy for this origin doesn't ` +
                `allow access from the particular origin.`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.use(helmet())
app.use(validateBearerToken)

app.use('/api/help', helpRouter)
app.use('/api/example', exampleRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)

app.use('/api/online', onlineRouter)

app.get('/', (req, res) => {
    res.send('Yippie!! Server Online in ' + NODE_ENV + ' mode! At ' + ADDRESS + ':' + PORT + ' and database connection ' + DATABASE_URL);
})

app.use(errorHandler)

module.exports = app