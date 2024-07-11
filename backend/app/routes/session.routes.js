const { authJwt } = require("../middlewares");
const controller = require("../controllers/session.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   
   /*** Session ***/
   
   /*** User non connecté ***/
   app.get("/api/sessions", controller.getSessions); 

  /*** User connecté ***/
   app.post("/api/sessions", [authJwt.verifyToken, authJwt.isAdmin], controller.addSessions);

   app.delete("/api/sessions/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteSession);
  
  }

  