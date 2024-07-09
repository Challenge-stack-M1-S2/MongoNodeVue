module.exports = (mongoose) => {
    const Tattoo = mongoose.model(
      'Tattoo',
      new mongoose.Schema({
        artist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur (artiste)
        style_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Style', required: true },
        image_url: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        created_at: { type: Date, default: Date.now }
      })
    );
  
    return Tattoo;
  };
  