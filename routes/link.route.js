import { Router } from "express";
import { requiereToken } from "../middlewares/requiereToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatiorManager.js";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controllers.js";
const router = Router();


// GET /api/v1/links                all links
// GET /api/v1/links/:id            single link
// POST /api/v1/links               create link
// PATCH/PUT /api/v1/links/:id      undate link
// la diferencia entre PATCH y PUT  es que el patch no nos modifica nada de lo que viene de nuestro Schema, sin envargo con el PUT si que podemos modificarlo

// DELETE /api/v1/links/:id         remove link


// Al colocarle requiereToken hacemos que podamos usar req.uid dentro de la función getLinks en link.controllerr.js
// Recuerda que el path esta en blanco ya que lo configuramos en el index
router.get("/",requiereToken, getLinks)
router.get("/:nanoLink", getLink)
router.post("/", requiereToken, bodyLinkValidator, createLink)
router.delete("/:id", requiereToken, paramLinkValidator, removeLink)
router.patch("/:id", requiereToken, paramLinkValidator, bodyLinkValidator, updateLink)

export default router;