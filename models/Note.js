export class Note {
    constructor(obj) {
        if (obj === null || typeof obj !== "object")
            throw new Error('object is required for constructor ')
        this.title = obj.title
        this.content = obj.content
        this.tags = obj.tags
    }

    static get keysArray() {
        return ['title', 'content', 'tags']
    }
}