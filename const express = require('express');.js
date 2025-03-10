const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = 3000;

// PhishTank proxy (optional)
app.get('/phish', async (req, res) => {
  try {
    const response = await axios.get('https://data.phishtank.com/data/online-valid.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API failed' });
  }
});

// KE-CIRT scraper
app.get('/ke-cirt', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.ke-cirt.go.ke/alerts');
    const $ = cheerio.load(data);
    const alerts = [];
    $('.alert-item').each((i, el) => {
      alerts.push({
        title: $(el).find('h3').text().trim(),
        summary: $(el).find('p').text().trim(),
        lat: -1.2921, // Mock coordinates
        lng: 36.8219
      });
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('🚀 Kenyan Cyber Threat Map Backend Running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
{
  "name": "kenya-cyber-map",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=18.x"
  }
}[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.build]
commands = ["npm ci"]

[start]
cmd = "npm start"
