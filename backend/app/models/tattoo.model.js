module.exports = (mongoose) => {
  const Tattoo = mongoose.model(
    'Tattoo',
    new mongoose.Schema({
      artist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Array of references to artists
      style_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Style', required: true },
      image_url: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      created_at: { type: Date, default: Date.now },
      _id: { type: String}
    })
  );

  return Tattoo;
};
