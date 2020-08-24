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
//Essa endpoint será descontinuada quando a extensão do Chrome atualizar
router.route('/qualis/issn/:issn')
  .get(qualisController.view);
//.patch(qualisController.update)
//.put(qualisController.update)
//.delete(qualisController.delete);

//Recupera um registro pelo issn/estrato
//Essa endpoint será descontinuada quando a extensão do Chrome atualizar
router.route('/qualis/issn/:issn/:estrato')
  .get(qualisController.view2);

//Recupera um registro pelo issn - Qualis 2019
router.route('/qualis/v2/issn/:issn')
  .get(qualisController.view3);

//Recupera um registro pelo issn - Qualis 2013-2016
router.route('/qualis/v1/issn/:issn')
  .get(qualisController.view);
//Recupera um registro pelo issn/estrato
router.route('/qualis/v1/issn/:issn/:estrato')
  .get(qualisController.view2);

  // Export API routes
module.exports = router;