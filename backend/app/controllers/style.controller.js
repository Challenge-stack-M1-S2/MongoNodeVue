const db = require("../models");
const Style = db.style;

exports.getStyles = async (req, res) => {
  try {
    const styles = await Style.find();

    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
