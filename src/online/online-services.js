const OnlineServices = {
    getConnection(knex) {
        return knex.select('*').from('tbl_users')
    }
}
module.exports = OnlineServices