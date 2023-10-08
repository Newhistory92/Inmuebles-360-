const passport = require("passport");
const { Router } = require("express");
const propertiesRouter = Router();
const { getPropertiesHandler, getPropertyByIdHandler, creatingPropertyHandler } = require("../handlers/propertyHandler");



propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.post("/",  passport.authenticate() ,(req, res, next) => {
        console.log("soy la auth", req.isAuthenticated)
        if (req.isAuthenticated()) {
          next(); 
        } else {
          res.status(401).json({ message: "No autorizado" });
        }
      },creatingPropertyHandler);

module.exports = { 
        propertiesRouter
        };