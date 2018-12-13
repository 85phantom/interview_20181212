
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('Member', table =>{
        table.string('birthday').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('Member', table =>{
        table.date('birthday').alter();
    }) 
};
