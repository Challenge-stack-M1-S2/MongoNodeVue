module.exports = (mongoose) => {
    const Review = mongoose.model(
      'Review',
      new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        artist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur (artiste)
        rating: { type: Number, required: true },
        comment: { type: String },
        created_at: { type: Date, default: Date.now }
      })
    );
  
    return Review;
  };
  