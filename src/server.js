const knex = require('knex')
const app = require('./app')
const { ADDRESS, PORT, DATABASE_URL } = require('./config')

const db = knex({
   //client: 'pg',
   // connection: DATABASE_URL,
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    },
    pool: {min:0, max:7}
})

app.set('db', db)

app.listen(PORT, () => {
    console.log(`Server listening at ${ADDRESS}:${PORT}`)
})