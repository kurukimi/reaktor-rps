require('dotenv').config()

let DB = process.env.DB
let PORT = process.env.PORT

module.exports = {
    DB:DB,
    PORT:PORT
}