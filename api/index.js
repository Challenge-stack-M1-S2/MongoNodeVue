const express = require('express');
const mongoose = require('mongoose');
const Tattoueur = require('./models/Tattoueur'); // Adjust path as per your file structure

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET all tattoueurs
app.get('/tattoueurs', async (req, res) => {
  try {
    const tattoueurs = await Tattoueur.find();
    res.json(tattoueurs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new tattoueur
app.post('/tattoueurs', async (req, res) => {
  try {
    const { name, style, location } = req.body;
    const newTattoueur = new Tattoueur({ name, style, location });
    await newTattoueur.save();
    res.status(201).json(newTattoueur);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
