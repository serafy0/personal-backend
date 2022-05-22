export interface Project {
    id: string
    title: string
    image: string
    links: Link[]
}

export interface Link {
    title: string
    url: string
}
