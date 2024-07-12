const db = require("../models");
const Session = db.session
const Tattoo = db.tattoo

// GET ALL SESSIONS
exports.getSessions = async (req, res) =>{
  try {
      const sessions = await Session.find().populate("tattoo_id");
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
// GET MY SESSIONS
exports.getMySessions = async (req, res) => {
    try {
        // Extraire l'ID de l'utilisateur à partir de req.userId
        const artistId = req.userId;

        // Recherchez les tatouages associés à cet artiste
        const tattoos = await Tattoo.find({ artist_id: artistId });
        const tattooIds = tattoos.map(tattoo => tattoo._id);

        // Trouvez les sessions qui ont un tatouage associé à cet artiste et qui sont disponibles
        const sessions = await Session.find({ tattoo_id: { $in: tattooIds } }).populate('tattoo_id');

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
};

exports.deleteSession = async (req, res) => {
    try {
      const userId = req.userId;
      const session = await Session.findById(req.params.id).populate({
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
  
      await Session.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

