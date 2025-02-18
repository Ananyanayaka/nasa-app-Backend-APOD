const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // For securely accessing the API key

const app = express();
const port = 5000;

// Enable CORS to allow communication between frontend and backend
app.use(cors());

// NASA API Key (stored securely in .env file)
const NASA_API_KEY = process.env.NASA_API_KEY;

// Welcome route at the root of the server
app.get('/', (req, res) => {
  res.send('Welcome to NASA API server, deployed by Ananya!');
});

// Route to get Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching APOD:", error);
    res.status(500).send('Unable to load image. Please try again later.');
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
