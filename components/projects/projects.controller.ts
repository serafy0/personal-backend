import { Request, Response } from "express"
import { createProject } from "./projects.service"

export async function addProject(request: Request, response: Response) {
    const { title, links } = request.body
    const newLinks = links.map((link: any) => JSON.parse(link))
    const project = await createProject({ title }, request.file, newLinks)
    response.status(200).json({ image: project })
}
