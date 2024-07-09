const express = require("express");
const cors = require("cors");
const { DbConnect } = require("./app/config/db.config");
const myEnv = require("./app/config/conf");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Tattoo = db.tattoo;
const Session = db.session;
const Appointment = db.appointment;
const Review = db.review;
const Style = db.style;

DbConnect()
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  try {
    console.log("Initialisation de la base de données...");
    // Nettoyer les collections existantes
    await clearDatabase();
    
    // Créer les rôles si nécessaire
    console.log("Création des rôles...");
    await createRoles();

    // Créer des utilisateurs et des artistes
    console.log("Création des utilisateurs et des artistes...");
    await createUsersAndArtists();

    // Créer des styles, tatouages, sessions, rendez-vous, et avis
    console.log("Création des données supplémentaires...");
    await createAdditionalData();
    
    console.log("Données supplémentaires créées.");

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    // Déconnexion de MongoDB une fois l'initialisation terminée
    db.mongoose.disconnect();
  }
}

// Fonction pour nettoyer les collections existantes
async function clearDatabase() {
  await Role.deleteMany({});
  await User.deleteMany({});
  await Tattoo.deleteMany({});
  await Session.deleteMany({});
  await Appointment.deleteMany({});
  await Review.deleteMany({});
  await Style.deleteMany({});
  console.log("Base de données nettoyée.");
}

// Fonction pour créer les rôles par défaut s'ils n'existent pas
async function createRoles() {
  const roles = ["user", "artist"];

  for (let roleName of roles) {
    let role = await Role.findOne({ name: roleName });
    if (!role) {
      role = new Role({ name: roleName });
      await role.save();
      console.log(`Ajouté '${roleName}' à la collection des rôles`);
    }
  }
  console.log("Rôles créés.");
}

// Fonction pour créer des utilisateurs et des artistes
async function createUsersAndArtists() {
  const roleUser = await Role.findOne({ name: 'user' });
  const roleArtist = await Role.findOne({ name: 'artist' });

  const users = [
    { username: 'user1', email: 'user1@example.com', password: 'password123', roles: [roleUser._id] },
    { username: 'user2', email: 'user2@example.com', password: 'password123', roles: [roleUser._id] },
    { username: 'user3', email: 'user3@example.com', password: 'password123', roles: [roleUser._id] },
    { username: 'user4', email: 'user4@example.com', password: 'password123', roles: [roleUser._id] },
    { username: 'user5', email: 'user5@example.com', password: 'password123', roles: [roleUser._id] },
  ];

  const artists = [
    { username: 'artist1', email: 'artist1@example.com', password: 'password123', roles: [roleArtist._id], bio: 'Artist bio 1', base_location: 'Location 1' },
    { username: 'artist2', email: 'artist2@example.com', password: 'password123', roles: [roleArtist._id], bio: 'Artist bio 2', base_location: 'Location 2' },
    { username: 'artist3', email: 'artist3@example.com', password: 'password123', roles: [roleArtist._id], bio: 'Artist bio 3', base_location: 'Location 3' },
  ];

  for (let userData of users) {
    let user = new User(userData);
    await user.save();
  }

  for (let artistData of artists) {
    let artist = new User(artistData);
    await artist.save();
  }
  console.log("Utilisateurs et artistes créés.");
}

// Fonction pour créer des styles, tatouages, sessions, rendez-vous, et avis
async function createAdditionalData() {
  const styles = [
    { style_name: 'Traditional' },
    { style_name: 'Realism' },
    { style_name: 'Watercolor' },
    { style_name: 'Tribal' },
    { style_name: 'New School' },
  ];

  let styleIds = [];
  for (let styleData of styles) {
    let style = new Style(styleData);
    await style.save();
    styleIds.push(style._id);
    console.log(`Style créé: ${styleData.style_name}, ID: ${style._id}`);
  }

  const artists = await User.find({ roles: { $in: [await Role.findOne({ name: 'artist' })] } });
  const users = await User.find({ roles: { $in: [await Role.findOne({ name: 'user' })] } });

  for (let artist of artists) {
    for (let styleId of styleIds) {
      const tattoo = new Tattoo({
        artist_id: artist._id,
        style_id: styleId,
        image_url: 'https://example.com/tattoo.jpg',
        description: 'Description du tatouage',
        price: 150,
      });
      await tattoo.save();

      const session = new Session({
        tattoo_id: tattoo._id,
        location: artist.base_location,
        start_datetime: new Date(),
        end_datetime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      });
      await session.save();

      const review = new Review({
        user_id: users[Math.floor(Math.random() * users.length)]._id,
        artist_id: artist._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: 'Great artist!',
      });
      await review.save();

      const appointment = new Appointment({
        user_id: users[Math.floor(Math.random() * users.length)]._id,
        session_id: session._id,
        status: ['reserved', 'finished', 'canceled'][Math.floor(Math.random() * 3)],
      });
      await appointment.save();
    }
  }
  console.log("Données supplémentaires créées.");
}
