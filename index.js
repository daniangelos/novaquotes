
'use strict'

/**
 * Module Dependencies
 */
const config         = require('./config'),
      //restify        = require('restify'),
      express        = require('express'),
      bunyan         = require('bunyan'),
      winston        = require('winston'),
      bunyanWinston  = require('bunyan-winston-adapter'),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser')
    

/**
 * Initialize Server
 */
global.server = express()

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.set('view engine', 'ejs')

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
  res.send(err)
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

  mongoose.connection.on('error', function(err) {
    process.exit(1)
  })

  mongoose.connection.on('open', function(err) {
    if (err) {
      process.exit(1)
    }
  })

  global.db = mongoose.connect(config.db.uri)
  console.log(`Listening on port ${ config.port }`)

})

require('./api/routes/')

module.exports = server
