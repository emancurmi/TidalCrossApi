const OrderServices = {
    getAllUsers(knex) {
        return knex.select('*').from('tbl_orders')
    },

    getById(knex, orderid) {
        return knex.from('tbl_orders').select('*').where('orderid', orderid).first()
    },

    getByUserId(knex, userid) {
        return knex.from('tbl_orders').select('*').where('userid', userid)
    },

    insertUser(knex, neworder) {
        return knex
            .insert(neworder)
            .into('tbl_orders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteUser(knex, orderid) {
        return knex('tbl_orders')
            .where('orderid', orderid)
            .delete()
    },

    updateUser(knex, orderid, neworder) {
        return knex('tbl_orders')
            .where('orderid', orderid)
            .update(neworder)
    },
}

module.exports = OrderServices