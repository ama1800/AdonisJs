'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      table.string('slug')
      table.string('content')

      table.integer('tag_id').unsigned().index()
      table.integer('user_id').unsigned().index()

      table.foreign('tag_id').references('tag_id')
      table.foreign('user_id').references('user_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
