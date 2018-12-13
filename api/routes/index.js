
'use strict'

/**
 * Module Dependencies
 */
const jwt = require('jsonwebtoken')


/**
 * Model Schema
 */
const Quote = require('../models/Quote')

/**
 * Controllers
 */

const quoteController    = require('../controllers/QuoteController')

/*       /*
* ROUTES *
*/       /*


/*
* RESTful routes for dabatase models
*/

// Quote
server.post('/novaquote',  quoteController.createQuote)
server.get('/quotes',     quoteController.getAll)
server.get('/quote/:id',  quoteController.getById)

