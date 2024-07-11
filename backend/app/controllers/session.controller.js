const db = require("../models");
const Session = db.session
const Tattoo = db.tattoo

exports.getSessions = async (req, res) => {
    try {
        // Extraire l'ID de l'utilisateur à partir de req.userId
        const artistId = req.userId;

        // Recherchez les tatouages associés à cet artiste
        const tattoos = await Tattoo.find({ artist_id: artistId });
        const tattooIds = tattoos.map(tattoo => tattoo._id);

        // Trouvez les sessions qui ont un tatouage associé à cet artiste et qui sont disponibles
        const sessions = await Session.find({ tattoo_id: { $in: tattooIds }, status: 'available' }).populate('tattoo_id');

        return res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};



//POST REQUEST
exports.addSessions = async (req, res, next) =>{
    try {
        const session = await Session.create(req.body);
        console.log(session)
        return res.status(200).json({
            success: true,
            data: session
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
        
    }
}