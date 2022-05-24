import { Knex } from "knex"
import { Project, Link } from "../../components/projects/projects.interface"

export async function seed(knex: Knex): Promise<void> {
    await knex("images").del()
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
    const images = await knex("images")
        .insert([
            {
                id: "sample",
                url: "https://res.cloudinary.com/dalisapxa/image/upload/v1632495988/sample.jpg",
            },
            {
                id: "sample2",
                url: "https://res.cloudinary.com/dalisapxa/image/upload/v1632495988/sample.jpg",
            },
        ])
        .returning("id")

    const [project] = await knex("projects")
        .insert([
            {
                title: title.id,
                image_id: images[0].id,
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
