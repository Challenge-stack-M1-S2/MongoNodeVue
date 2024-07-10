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

    res.status(200).json(tattoos);
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
        populate: {
          path: "roles"
        }
      });
      
    if (!tattoo) {
      return res.status(404).json({ message: "Tattoo not found" });
    }

    res.status(200).json(tattoo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTattoo = async (req, res) => {
  const { artist_id, style_id, image_url, description, price } = req.body;

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

exports.updateTattoo = async (req, res) => {
  try {
    const updatedTattoo = await Tattoo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTattoo) {
      return res.status(404).json({ message: "Tattoo not found" });
    }
    res.status(200).json(updatedTattoo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTattoo = async (req, res) => {
  try {
    const deletedTattoo = await Tattoo.findByIdAndRemove(req.params.id);
    if (!deletedTattoo) {
      return res.status(404).json({ message: "Tattoo not found" });
    }
    res.status(200).json({ message: "Tattoo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};