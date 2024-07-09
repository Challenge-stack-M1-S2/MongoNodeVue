module.exports = (mongoose) => {
  const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
      bio: { type: String }, // Bio facultative pour les  user
      base_location: { type: String }, // Lieu de base facultatif pour les  user
      instagram: { type: String }, // Instagram facultatif pour les user
      average_rating: { type: Number, default: 0 }, // note moyenne facultatif pour les user
      avatar: { type: String }, // Champ facultatif pour l'image avatar pour les user
    })
  );

  return User;
};
