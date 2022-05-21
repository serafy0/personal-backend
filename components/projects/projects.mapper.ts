export function hydrateProjects(projects: any[]): Project[] {
    const map = new Map<string, Project>()
    for (let project of projects) {
        const { id, link } = project
        delete project["link"]
        const item = map.get(id)
        if (item) {
            const { links } = item
            links.push(link)
            map.set(id, { ...project, links })
        } else {
            map.set(id, { ...project, links: [link] })
        }
    }
    return Array.from(map.values())
}
