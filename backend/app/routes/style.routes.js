const { authJwt } = require("../middlewares");
const controller = require("../controllers/style.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
 /*** Style ***/
 
 /*** User non connecté ***/
 app.get("/api/styles", controller.getStyles) 
}