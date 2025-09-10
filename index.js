import express from "express";
import bodyParser from "body-parser";

const APP = express();
const PORT = 3000;

APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(express.static("public"));

APP.set("view engine", "ejs");
APP.set("views", "./views");

let recetas = [];

APP.get("/", (req, res) => {
  res.render("index", { recetas });
});

APP.get("/publish", (req, res) => {
  res.render("publish");
});

APP.post("/publish", (req, res) => {
  const { tituloReceta, ingredientes, receta } = req.body;

  recetas.push({
    titulo: tituloReceta,
    ingredientes: ingredientes.split(","),
    receta,
    imagen: "/images/espinacas-con-pasas-y-pinones.jpg"
  });

  res.redirect("/");
});

APP.get("/receta/:id", (req, res) => {
  const receta = recetas[req.params.id];
  if (!receta) return res.status(404).send("Receta no encontrada");
  res.render("receta", { receta, recetas });
});

APP.listen(PORT, () => { console.log(`Listening to port ${PORT}.`) });