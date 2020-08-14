// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
  issn: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  estrato: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = function (callback, limit) {
  Contact.find(callback).limit(limit);
}