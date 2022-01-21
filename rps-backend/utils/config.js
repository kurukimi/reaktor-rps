require('dotenv').config()

let DB = process.env.DB
let PORT = parseInt(process.env.PORT)

module.exports = {
    DB:DB,
    PORT:PORT
}