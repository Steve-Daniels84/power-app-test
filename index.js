const express = require('express');
const dotenv = require('dotenv');
const app = express();

const data = {
    shareholders: "Steve Test Shareholder",
    last_submission: "€3,000,000",
    current_spend: "€1,000,000",
    current_rebate: "€10,000",
    compliance_score: "90%"
}

// Load environment variables
dotenv.config();

// The API key should be stored in your environment variable for security
const API_KEY = process.env.API_KEY || 'your-api-key'; // Replace this with the actual API key from your environment

// Middleware to check API key in query parameters
const authenticateApiKey = (req, res, next) => {
  // Access the API key from the 'apiKey' query parameter
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(403).send('Access Denied: No API key provided');
  }

  if (apiKey !== API_KEY) {
    return res.status(403).send('Access Denied: Invalid API key');
  }

  next(); // If valid, proceed to the next middleware or route handler
};

// Routes
app.get('/secure-data', authenticateApiKey, (req, res) => {
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});