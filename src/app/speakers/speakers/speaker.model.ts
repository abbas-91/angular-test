export interface SpeakerResponse {
    collection: Collection
}

export interface Collection {
    items: any[]
}

export interface SpeakerItem {
    name: string,
    value: string,
    descUrl: string,
    sessionUrl: string,
    desc: string,
    sessions: SessionItem[]
}

export interface SessionItem {
    name: string,
    value: string,
}