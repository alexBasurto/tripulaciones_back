import votingReasonsModel from "../models/votingReasonsModel.js";

const create = async (req, res) => {
    try {
        const { idVoting, idReason } = req.body;
        const votingReasons = await votingReasonsModel.create({
            idVoting,
            idReason: idReason,
        });
        res.status(200).json({
            message: "Razones guardadas correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { create };