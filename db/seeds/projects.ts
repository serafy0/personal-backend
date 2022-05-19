import { Knex } from "knex"
import { join } from "path"

export async function seed(knex: Knex): Promise<void> {
    await knex("links").del()
    await knex("projects_tags").del()
    await knex("tags").del()
    await knex("projects").del()
    await knex("string_contents").del()

    const [title] = await knex("string_contents")
        .insert({
            string: "pet shop",
        })
        .returning("id")

    await knex("translations").insert([
        {
            id: title.id,
            string: "le magasin d'animaux domestiques",
            language: "fr",
        },
        { id: title.id, string: "محل حيوانات", language: "ar" },
    ])

    const [project] = await knex("projects")
        .insert([
            {
                title: title.id,
                image: "https://res.cloudinary.com/dalisapxa/image/upload/v1652927634/portfolio/Screen_Shot_2021-09-29_at_7.35.30_PM_vg8dg8.png",
            },
        ])
        .returning("id")

    const tags = await knex("tags")
        .insert([{ title: "node.js" }, { title: "typescript" }])
        .returning("title")

    await knex("projects_tags").insert([
        { project_id: project.id, tag: tags[0].title },
        { project_id: project.id, tag: tags[1].title },
    ])

    await knex("links").insert([
        {
            link: "https://github.com/hatchways/team-naan-bread",
            project: project.id,
            title: "github",
        },
        {
            link: "https://github.com/serafy0",
            project: project.id,
            title: "deployment",
        },
    ])
}
