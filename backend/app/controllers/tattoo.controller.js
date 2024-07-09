const db = require("../models");
const Tattoo = db.tattoo;

exports.getTattoos = async (req, res) => {
  try {
    const tattoos = await Tattoo.find().populate("style_id").populate("artist_id");
    res.status(200).json(tattoos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};