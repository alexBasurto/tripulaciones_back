import commentsModel from "../models/commentsModel.js";

const getAll = async (req, res) => {
    try {
        const comments = await commentsModel.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const comment = await commentsModel.findByPk(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const create = async (req, res) => {
    try {
        // Haga una llamada POST o GET con el texto del comentario al modelo de data
        // Espera a recibir el comentario y la clasificación de la respuesta (idTag del 1 al 5)
        const today = new Date().toISOString().slice(0, 10);
        const [comment, metadata] = await commentsModel.sequelize.query(`
            INSERT INTO tbComments (idEmployee, idCompany, comment, date)
            VALUES (${req.body.idEmployee}, ${req.body.idCompany}, '${req.body.comment}', '${today}')
        `);
        res.status(201).json({ message: "Comment created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
    getAll,
    getById,
    create
}