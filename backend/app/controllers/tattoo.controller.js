const db = require("../models");
const geocoder = require('../utils/geocoder');
const Tattoo = db.tattoo;
const Style = db.style;
const User = db.user;
const Session = db.session;

exports.getTattoos = async (req, res) => {
  try {
    const tattoos = await Tattoo.find()
      .populate({
        path: "style_id",
        select: "style_name"
      })
      .populate({
        path: "artist_id",
        select: "username email bio base_location average_rating avatar",
        populate: {
          path: "roles",
          select: "name"
        }
      });

    // Check for available sessions for each tattoo
    const tattoosWithAvailability = await Promise.all(
      tattoos.map(async (tattoo) => {
        const availableSessions = await Session.find({
          tattoo_id: tattoo._id,
          status: 'available',
          end_datetime: { $gte: new Date() } // Ensure the session end time is in the future
        });
        
        // Add a boolean indicating if there are any available sessions
        return {
          ...tattoo.toObject(), // Convert Mongoose document to plain object
          hasAvailableSessions: availableSessions.length > 0
        };
      })
    );

    res.status(200).json(tattoosWithAvailability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTattoosByFilter = async (req, res) => {
  try {
    const { style, location, date, artist } = req.query;
    let filters = {};

    if (style) {
      const styleDoc = await Style.findOne({ style_name: style });
      if (styleDoc) {
        filters.style_id = styleDoc._id;
      }
    }

    if (artist) {
      const artistDoc = await User.findOne({ username: artist });
      if (artistDoc) {
        filters.artist_id = artistDoc._id;
      }
    }

    let sessionFilters = {};

    if (location) {
      const loc = await geocoder.geocode(location);
      if (loc.length > 0) {
        const { latitude, longitude } = loc[0];
        sessionFilters.location = {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], 5 / 6378.1] // 5 km radius
          }
        };
      }
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      sessionFilters.start_datetime = { $gte: start, $lt: end };
    }

    let sessionTattooIds = [];
    if (Object.keys(sessionFilters).length > 0) {
      const sessions = await Session.find(sessionFilters);
      sessionTattooIds = sessions.map(session => session.tattoo_id);
      filters._id = { $in: sessionTattooIds };
    }

    const tattoos = await Tattoo.find(filters)
      .populate({
        path: "style_id",
        select: "style_name"
      })
      .populate({
        path: "artist_id",
        select: "username email bio base_location",
        populate: {
          path: "roles",
          select: "name"
        }
      });

    res.status(200).json({
      success: true,
      count: tattoos.length,
      data: tattoos
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTattooById = async (req, res) => {
  try {
    const tattoo = await Tattoo.findById(req.params.id)
      .populate("style_id")
      .populate({
        path: "artist_id",
        select: "-password", // Exclure le mot de passe
        populate: {
          path: "roles",
          select: "name"
        }
      });

    if (!tattoo) {
      return res.status(404).json({ message: "Tattoo not found" });
    }

    // Récupérer les sessions associées avec le statut 'available'
    const sessions = await Session.find({ tattoo_id: tattoo._id, status: 'available' });

    res.status(200).json({ tattoo, sessions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.createTattoo = async (req, res) => {
  const { style_id, image_url, description, price } = req.body;
  const artist_id = req.userId; // Récupère l'artist_id à partir de req.userId

  try {
    const newTattoo = new Tattoo({
      artist_id,
      style_id,
      image_url,
      description,
      price
    });

    const savedTattoo = await newTattoo.save();
    res.status(201).json(savedTattoo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTattoo = 
  async (req, res) => {
    try {
      const userId = req.userId; // ID de l'utilisateur connecté

      const tattoo = await Tattoo.findById(req.params.id);
      if (!tattoo) {
        return res.status(404).json({ message: "Tattoo not found" });
      }

      // Vérifiez que l'utilisateur connecté est bien l'artiste propriétaire du tatouage
      if (tattoo.artist_id.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized action. Only the artist can update their own tattoo." });
      }

      const updatedTattoo = await Tattoo.findByIdAndUpdate(req.params.id, req.body, { new: true });

      res.status(200).json(updatedTattoo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


exports.deleteTattoo =  // Middleware pour vérifier le token JWT
  async (req, res) => {
    try {
      const userId = req.userId;

      const tattoo = await Tattoo.findById(req.params.id);
      if (!tattoo) {
        return res.status(404).json({ message: "Tattoo not found" });
      }

      // Vérifiez que l'utilisateur connecté est bien l'artiste propriétaire du tatouage
      if (tattoo.artist_id.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized action. Only the artist can delete their own tattoo." });
      }

      await Tattoo.findByIdAndRemove(req.params.id);

      res.status(200).json({ message: "Tattoo deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
;

exports.getTattoosByArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const tattoos = await Tattoo.find({ artist_id: req.userId })
      .populate({
        path: "style_id",
        select: "style_name"
      })
      .populate({
        path: "artist_id",
        select: "username email bio base_location average_rating avatar",
        populate: {
          path: "roles",
          select: "name"
        }
      });

    if (!tattoos || tattoos.length === 0) {
      return res.status(404).json({ message: "No tattoos found for this artist" });
    }

    res.status(200).json({
      success: true,
      count: tattoos.length,
      data: tattoos
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};