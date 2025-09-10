import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const APP = express();
const PORT = 3000;

APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(express.static("public"));
APP.use(methodOverride("_method"));

APP.set("view engine", "ejs");
APP.set("views", "./views");

let recetas = [];

APP.get("/", (req, res) => {
  res.render("index", { recetas });
});

APP.get("/publish", (req, res) => {
  res.render("publish");
});

APP.get("/search", (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  const index = recetas.findIndex(r => r.titulo.toLowerCase().includes(query));

  if (index !== -1) {
    res.redirect(`/receta/${index}`);
  } else {
    res.send("No se encontró ninguna receta con ese título");
  }
});

APP.get("/receta/:id", (req, res) => {
  const id = req.params.id;
  const receta = recetas[id];
  
  if (receta) {
    res.render("receta", { receta, recetas, id });
  } else {
    res.status(404).send("Receta no encontrada");
  }
});

APP.get("/receta/:id/editar", (req, res) => {
  const id = req.params.id;
  const receta = recetas[id];
  if (!receta) return res.status(404).send("Receta no encontrada");
  res.render("editar", { receta, id });
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

APP.patch("/receta/:id", (req, res) => {
  const id = req.params.id;
  recetas[id] = {
    titulo: req.body.tituloReceta,
    ingredientes: req.body.ingredientes.split(","),
    receta: req.body.receta,
    imagen: req.body.imagen,
  };
  res.redirect(`/receta/${id}`);
});

APP.delete("/receta/:id", (req, res) => {
  const id = req.params.id;
  if (!recetas[id]) return res.status(404).send("Receta no encontrada");

  recetas.splice(id, 1);
  res.redirect("/");
});



APP.listen(PORT, () => { console.log(`Listening to port ${PORT}.`) });