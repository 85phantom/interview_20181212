
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Member', table =>{
    table.increments('id');
    table.string('name');
    table.enu('gender',['female', 'male', 'others']);
    table.date('birthday');
  })
};

exports.down = function(knex, Promise) {
  return kenx.schema.dropTable('Member');
};
