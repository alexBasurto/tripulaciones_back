import votingFeelingsModel from "../models/votingFeelingsModel.js";

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { idVoting, idFeeling } = req.body;
        const votingFeelings = await votingFeelingsModel.create({
            idVoting,
            idFeeling: idFeeling,
        });
        
        res.status(200).json({
            message: "Sentimientos guardados correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { create };