const { authJwt } = require("../middlewares");
const controller = require("../controllers/tattoo.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
 /*** Tattoo ***/
 
 /*** User non connecté ***/
 app.get("/api/tattoos", controller.getTattoos) 
 app.get("/api/tattoos/filter", controller.getTattoosByFilter);
 app.get("/api/tattoos/:id", controller.getTattooById);

 // Admin / Artist
 app.post("/api/tattoos", [authJwt.verifyToken, authJwt.isAdmin], controller.createTattoo);
 app.put("/api/tattoos/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateTattoo);
 app.delete("/api/tattoos/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteTattoo);

 app.get('/api/myTattoos', [authJwt.verifyToken, authJwt.isAdmin], controller.getTattoosByArtist);

}