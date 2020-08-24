// qualisModelV2.js
var mongoose = require('mongoose');
//setup schema v2
var qualisSchemaV2 = mongoose.Schema({
  issn: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  estrato: {
    type: String,
    required: true
  }
}, { collection: 'qualis2019' });

// Export Qualis model v2
var QualisV2 = module.exports = mongoose.model('qualis2019', qualisSchemaV2, 'qualis2019');
module.exports.get = function (callback, limit) {
  QualisV2.find(callback).limit(limit);
}