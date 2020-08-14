// qualisModel.js
var mongoose = require('mongoose');
// Setup schema
var qualisSchema = mongoose.Schema({
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
// Export Qualis model
var Qualis = module.exports = mongoose.model('qualis', qualisSchema);
module.exports.get = function (callback, limit) {
  Qualis.find(callback).limit(limit);
}