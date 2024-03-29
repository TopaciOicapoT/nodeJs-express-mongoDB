import { Link } from "../models/links.js";

export const redirectLink = async (req, res) => {
    try {
        const { nanoLink } = req.params
        const link = await Link.findOne({nanoLink})

        if (!link)
            return res.status(404).json({ error: "No existe el link" });


        return res.redirect(link.longLink)
        // Este return nos llevaria al longLink al colocar esta direccioón:   http://localhost:5000/y98eLk

    } catch (error) {
        console.log(error)
        if (error.kind === "objectId") {
            return res.status(403).json({ error: 'Formato id incorrecto' })

        }
        return res.status(500).json({ error: 'error de servidor' })
    }
}