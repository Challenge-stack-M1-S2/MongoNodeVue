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
};

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
};

exports.deleteSession = async (req, res) => {
    try {
      const userId = req.userId;
      const session = await Session2.findById(req.params.id).populate({
        path: 'tattoo_id',
        select: 'artist_id'
      });
      
      console.log(session);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Check if the logged-in user is the artist who owns the tattoo
      if (session.tattoo_id.artist_id.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized action. Only the artist can delete their own tattoo session." });
      }
  
      await Session2.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

