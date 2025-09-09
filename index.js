import express from "express";

const APP = express();
const PORT = 3000;

APP.use(express.static("public"));

APP.set("view engine", "ejs");
APP.set("views", "./views");

APP.get("/", (req, res) => {
  res.render("index");
});

APP.get("/publish", (req, res) => {
  res.render("publish", {
    nombreImagen: "espinacas-con-pasas-y-pinones",
    tituloReceta: "Espinacas con pasas y piñones"
  });
});


APP.listen(PORT, () => { console.log(`Listening to port ${PORT}.`) });