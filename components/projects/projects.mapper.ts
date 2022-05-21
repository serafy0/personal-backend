export function hydrateProjects(projects: any[]): any[] {
    const map = new Map()
    for (let project of projects) {
        const { id, link } = project
        delete project["link"]

        if (map.has(id)) {
            map.set(id, {
                ...project,
                links: [...map.get(id).links, link],
            })
        } else {
            map.set(id, { ...project, links: [link] })
        }
    }
    return Array.from(map.values())
}
