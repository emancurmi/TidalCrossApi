const UserServices = {
    getAllUsers(knex) {
        return knex.select('*').from('tbl_users')
    },

    getById(knex, userid) {
        return knex.from('tbl_users').select('*').where('userid', userid).first()
    },

    getByUserEmail(knex, useremail) {
        return knex.from('tbl_users').select('*').where('useremail', useremail)
    },

    getByUserRole(knex, userrole) {
        return knex.from('tbl_users').select('*').where('userrole', userrole)
    },

    getByUserEmailOnly(knex, useremail) {
        return knex.from('tbl_users').select('*').where('useremail', useremail)
    },

    insertUser(knex, newuser) {
        return knex
            .insert(newuser)
            .into('tbl_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteUser(knex, userid) {
        return knex('tbl_users')
            .where('userid', userid)
            .delete()
    },

    updateUser(knex, userid, newuserfields) {
        return knex('tbl_users')
            .where('userid', userid)
            .update(newuserfields)
    },
}

module.exports = UserServices