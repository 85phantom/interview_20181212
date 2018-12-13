
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Admin', table =>{
        table.increments('id');
        table.string('email');
        table.string('password');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('Admin')
};
