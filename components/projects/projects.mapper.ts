export function hydrateProjects(projects: any[]): any[] {
    const map = new Map()
    for (let project of projects) {
        let link: string = ""
        if (map.has(project.id)) {
            link = project.link
            delete project["link"]
            map.set(project.id, {
                ...project,
                links: [...map.get(project.id).links, link],
            })
        } else {
            link = project.link
            delete project["link"]
            map.set(project.id, { ...project, links: [link] })
        }
    }
    return Array.from(map.values())
}
