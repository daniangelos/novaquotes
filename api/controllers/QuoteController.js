'use strict';

const Controller   = require('./Controller'),
      mongoose     = require('mongoose'),
      Quote 		   = mongoose.model('Quote')


const QuoteController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Quote, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Quote, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Quote, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Quote, res, id)
  },

  createQuote(req, res, next){
    const quote = new Quote({'quote': req.body.text, 'date': new Date()})
    quote.save((err, quote) => {
      if(err) throw err
      else res.send(quote)
    })
  },

  renderHome(req, res, next){
    Quote.find({}).then(quotelist => {
      res.render('index', {quotelist.reverse()})
    })
  }
}


module.exports = QuoteController
