const { authJwt } = require("../middlewares");
const controller = require("../controllers/appointment.controller");

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
   app.get("/api/appointments", controller.getAppointments);
   app.post("/api/appointments", controller.addAppointments);

   // user connecté 
   app.get("/api/myAppointments", [authJwt.verifyToken], controller.getUserAppointments);
  //  app.get("/api/appointments/user/:userId", [authJwt.verifyToken], controller.getUserAppointments);
  
  }

  