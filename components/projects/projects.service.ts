import db from "../../db"

export async function createProject(data: any, image: any, links: any[]) {
    const { title } = data

    const [newTitle] = await db("string_contents")
        .insert({
            string: title,
        })
        .returning("id")

    const [newImage] = await db("images")
        .insert({
            id: image.filename,
            url: image.path,
        })
        .returning("id")

    const [newProject] = await db("projects")
        .insert([
            {
                title: newTitle.id,
                image_id: newImage.id,
            },
        ])
        .returning("*")
    const projectLinks = links.map((link) => {
        return { link: link.link, title: link.title, project: newProject.id }
    })
    const newLinks = await db("links").insert(projectLinks).returning("*")
    newProject.links = newLinks

    return newProject
}

export async function getOneProjectById(id: string) {
    const [project] = await db.select("*").from("projects").where("id", "=", id)

    return project
}
