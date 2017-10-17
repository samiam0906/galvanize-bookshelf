
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary()
    table.string('title', 255).notNull().default('')
    table.string('author', 255).notNull().default('')
    table.string('genre', 255).notNull().default('')
    table.text('description').notNull().default('')
    table.text('cover_url').notNull().default('')
    table.timestamp('created_at').notNull().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNull().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books')
};
