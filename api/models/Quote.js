
'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    autopopulate     = require('mongoose-autopopulate'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const QuoteSchema = new mongoose.Schema({
    quote: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      required: true
    }
});

QuoteSchema.plugin(autopopulate)
QuoteSchema.plugin(mongooseApiQuery)
QuoteSchema.plugin(createdModified, { index: true })

const Quote = mongoose.model('Quote', QuoteSchema)

module.exports = Quote
