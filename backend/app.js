// requires
const express    = require('express')
const restful    = require('node-restful')
const bodyParser = require('body-parser')
const cors       = require('cors')
const server     = express()
const mongoose   = restful.mongoose

// database
mongoose.Promise = global.Promise
mongoose.connect( 'mongodb://db/mydb' )

// middlewares
server.use( bodyParser.urlencoded({  extended: true }) )
server.use( bodyParser.json() )
server.use( cors() )

// odm
const Client = restful.model('Client', {
    name: {
        type: String, 
        required: true
    }
})

// rest api
Client.methods([
    'get',
    'post',
    'put',
    'delete'
])

Client.updateOptions({
    new: true,
    runValidators: true
})

// routes
Client.register(server, '/clients')

// start server
server.listen( 3000 )