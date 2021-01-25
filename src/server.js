const knex = require('knex')
const app = require('./app')
const { ADDRESS, PORT, DB_URL } = require('./config')

const db = knex({
    client: 'pg',
    connection: DB_URL,
    ssl: require
})

app.set('db', db)

app.listen(PORT, () => {
    console.log(`Server listening at ${ADDRESS}:${PORT}`)
})