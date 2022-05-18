import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("languages")
    await knex.schema.dropTableIfExists("translations")
    await knex.schema.dropTableIfExists("string_contents")

    await knex.schema.createTable("languages", (table) => {
        table.string("id").primary()
        table.string("name")
    })

    await knex.schema.createTable("string_contents", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
        table.string("string").notNullable()
    })

    await knex.schema.createTable("translations", (table) => {
        table
            .uuid("id")
            .references("string_contents.id")
            .onUpdate("cascade")
            .onDelete("cascade")

        table.string("language").references("languages.id").onUpdate("cascade")
        table.string("string").notNullable()
        table.primary(["id", "language"])
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("translations")
    await knex.schema.dropTableIfExists("string_contents")
    await knex.schema.dropTableIfExists("languages")
}
