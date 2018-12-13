
'use strict'

/**
 * Module Dependencies
 */
const config         = require('./config'),
      restify        = require('restify'),
      bunyan         = require('bunyan'),
      winston        = require('winston'),
      bunyanWinston  = require('bunyan-winston-adapter'),
      mongoose       = require('mongoose'),
      corsMiddleware = require('restify-cors-middleware')

/**
 * Initialize Server
 */
global.server = restify.createServer({
  url     : config.base_url,
  name    : config.name,
  version : config.version,
})

/**
 * Middleware
 */
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['Access-Control-Allow-Origin'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())



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
