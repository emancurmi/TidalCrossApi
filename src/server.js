const knex = require('knex')
const app = require('./app')
const { ADDRESS, PORT, DB_URL } = require('./config')

const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost:3306',
        user: 'fjntw_wp_ckdgs',
        password: '%24Y#On_H&#3~z45',
        database: 'wp_sq5x0'
    }
})

app.set('db', db)

app.listen(PORT, () => {
    console.log(`Server listening at ${ADDRESS}:${PORT}`)
})