// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to QualisAPI crafted with love!',
  });
});

// Import qualis controller
var qualisController = require('./qualisController');
// Qualis routes
//Recupera todos os 131000 registros. Trava o browser
/*
router.route('/qualis')
  .get(qualisController.index)
  .post(qualisController.new);
*/
//Recupera um registro pelo ISSN
  router.route('/qualis/issn/:issn')
  .get(qualisController.view);
  //.patch(qualisController.update)
  //.put(qualisController.update)
  //.delete(qualisController.delete);

//Recupera um registro pelo issn/estrato
router.route('/qualis/issn/:issn/:estrato')
  .get(qualisController.view2);
// Export API routes
module.exports = router;