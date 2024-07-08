const express = require("express");
const cors = require("cors");
const { DbConnect } = require("./app/config/db.config");
const mongoose = require('mongoose'); 
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
    // Créer les rôles si nécessaire
    await createRoles();

    // Créer un utilisateur normal
    const user = await createUser();
    console.log('Utilisateur normal créé:', user);

    // Créer un artiste avec des tatouages et des sessions
    const artist = await createArtist(user);
    console.log('Artiste créé:', artist);

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    // Déconnexion de MongoDB une fois l'initialisation terminée
    db.mongoose.disconnect();
  }
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
}

// Fonction pour créer un utilisateur normal
async function createUser() {
  const roleUser = await Role.findOne({ name: 'user' });

  const user = new User({
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
    roles: [roleUser._id], // Assigner le rôle "user"
  });

  await user.save();
  return user;
}

// Fonction pour créer un artiste avec des tatouages et des sessions
async function createArtist(user) {
  try {
    const roleArtist = await Role.findOne({ name: 'artist' });

    if (!roleArtist) {
      throw new Error('Le rôle "artist" n\'existe pas dans la base de données.');
    }

    // Mettre à jour l'utilisateur pour le rôle d'artiste
    user.roles.push(roleArtist._id);
    await user.save();

    // Vous pouvez maintenant utiliser l'utilisateur pour créer l'artiste
    const artist = {
      user_id: user._id, // Utilisez l'ID de l'utilisateur
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      bio: 'Tatoueur spécialisé dans les designs traditionnels.',
      base_location: 'New York',
      instagram: 'janesmith_tattoos',
      tiktok: 'janesmith_tattoos',
    };

    // Créer quelques tatouages pour l'artiste
    const tattoo1 = new Tattoo({
      artist_id: user._id,
      style_id: mongoose.Types.ObjectId(), // Remplacer par l'ID du style approprié
      image_url: 'https://example.com/tattoo1.jpg',
      description: 'Description du tatouage 1',
      price: 100,
    });
    await tattoo1.save();

    const tattoo2 = new Tattoo({
      artist_id: user._id,
      style_id: mongoose.Types.ObjectId(), // Remplacer par l'ID du style approprié
      image_url: 'https://example.com/tattoo2.jpg',
      description: 'Description du tatouage 2',
      price: 150,
    });
    await tattoo2.save();

    // Créer quelques sessions pour l'artiste
    const session1 = new Session({
      tattoo_id: tattoo1._id,
      location: 'New York',
      start_datetime: new Date('2024-07-15T10:00:00Z'),
      end_datetime: new Date('2024-07-15T12:00:00Z'),
    });
    await session1.save();

    const session2 = new Session({
      tattoo_id: tattoo2._id,
      location: 'Los Angeles',
      start_datetime: new Date('2024-07-20T14:00:00Z'),
      end_datetime: new Date('2024-07-20T16:00:00Z'),
    });
    await session2.save();

    return artist;
  } catch (error) {
    console.error('Erreur lors de la création de l\'artiste:', error);
    throw error; // Propager l'erreur pour la gestion ultérieure
  }
}
