export function hydrateProjects(projects: any[]): Project[] {
    const map = new Map<string, Project>()
    for (let project of projects) {
        const { id, link, link_title, title, image } = project
        let hydratedLink: Link = { url: link, title: link_title }
        const item = map.get(id)
        if (item) {
            const { links } = item
            links.push({ url: hydratedLink.url, title: hydratedLink.title })

            map.set(id, {
                id,
                title,
                image,
                links: links,
            })
        } else {
            map.set(id, {
                id,
                title,
                image,
                links: [hydratedLink],
            })
        }
    }
    return Array.from(map.values())
}
