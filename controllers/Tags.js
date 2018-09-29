const fs = require("fs")
const util = require('util')

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)


export class Tags {
    static home(req, res) {
        readFile("tags.json", 'utf8')
            .then(data => JSON.parse(data))
            .then(tags => res.send(tags))
    }
}