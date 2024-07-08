const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Définir une route simple
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Ajoutez cette route avant `app.listen`
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });