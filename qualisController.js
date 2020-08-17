// qualisController.js
// Import qualis model
Qualis = require('./qualisModel');
// Handle index actions
exports.index = function (req, res) {
  Qualis.get(function (err, contacts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Contacts retrieved successfully.",
      data: contacts
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var qualis = new Qualis();
  qualis.issn = req.body.issn ? req.body.issn : qualis.issn;
  qualis.titulo = req.body.titulo;
  qualis.area = req.body.area;
  qualis.estrato = req.body.estrato;
  // save the contact and check for errors
  qualis.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New contact created!',
      data: qualis
    });
  });
};
// Handle view qualis info
exports.view = function (req, res) {
  Qualis.find({issn:req.params.issn}, function (err, qualis) {
    if (err)
      res.send(err);
    if (qualis.length){
      res.json({
        //message: 'Contact details loading...',
        data: qualis
      });
    } else {
      res.json({
        message: 'Sem retorno',
        data: qualis
      })
    }  
  });
};
// Handle view qualis/estrato info
exports.view2 = function (req, res) {
  Qualis.find({issn:req.params.issn, estrato:req.params.estrato}, function (err, qualis) {
    if (err)
      res.send(err);
    if (qualis.length){
      res.json({
        message: 'Contact details loading...',
        data: qualis
      });
    } else {
      res.json({
        message: 'Sem retorno',
        data: qualis
      })
    }
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Qualis.findById(req.params.qualis_id, function (err, qualis) {
    if (err)
      res.send(err);
    qualis.issn = req.body.issn ? req.body.issn : qualis.issn;
    qualis.titulo = req.body.titulo;
    qualis.area = req.body.area;
    qualis.estrato = req.body.estrato;
    // save the contact and check for errors
    qualis.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Contact Info updated',
        data: qualis
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  Qualis.remove({
    _id: req.params.qualis_id
  }, function (err, qualis) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Contact deleted'
    });
  });
};