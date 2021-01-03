const ExampleServices = {
    getAllExamples(knex) {
        return knex.select('*').from('tbl_example')
    },

    getAllExamplesbyexampleid(knex, exampleId) {
        return knex.from('tbl_example').select('*').where('id', exampleId).first()
    },

    getById(knex, exampleId) {
        return knex.from('tbl_example').select('*').where('id', exampleId).first()
    },

    insertExample(knex, newExample) {
        return knex
            .insert(newExample)
            .into('tbl_example')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteExaple(knex, id) {
        return knex('tbl_example')
            .where({ id })
            .delete()
    },

    updateExample(knex, id, newExampleFields) {
        return knex('tbl_example')
            .where({ id })
            .update(newExampleFields)
    },
}

module.exports = ExampleServices