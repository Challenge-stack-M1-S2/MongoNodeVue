const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /********** Test des roles ***********/

  // User non connecté
  app.get("/api/test/all", controller.allAccess);

  // User connecté
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // Tatoueur
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    res.status(200).send({ message: "User is an admin!" });
  });

};
