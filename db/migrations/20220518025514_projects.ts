import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("images", (table) => {
        table.string("id").primary()
        table.string("url").notNullable()
    })
    await knex.schema.createTable("projects", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
        table.uuid("title").references("string_contents.id").notNullable()
        table.string("image_id").notNullable()
    })
    await knex.schema.createTable("links", (table) => {
        table.string("link").primary()
        table.uuid("project").references("projects.id").notNullable()
        table.string("title").notNullable()
    })
    await knex.schema.createTable("tags", (table) => {
        table.string("title").primary()
    })
    await knex.schema.createTable("projects_tags", (table) => {
        table.uuid("project_id").references("projects.id")
        table.string("tag").references("tags.title")
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("links")
    await knex.schema.dropTableIfExists("projects_tags")
    await knex.schema.dropTableIfExists("tags")
    await knex.schema.dropTableIfExists("projects")
}
