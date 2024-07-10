const db = require("../models");
const Session2 = db.session

//GET REQUEST
exports.getSessions = async (req, res) =>{
    try {
        const sessions = await Session2.find().populate("tattoo_id");
        return res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
        
    }
}

//POST REQUEST
exports.addSessions = async (req, res, next) =>{
    try {
        const session = await Session2.create(req.body);
        return res.status(200).json({
            success: true,
            data: session
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
        
    }
}