export class Notes {
    static home(req, res) {
        const title = "NotTaking App"
        res.render('index', {title})
    }
}