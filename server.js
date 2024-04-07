require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./router');
const mongoose = require('mongoose');

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes.init_routes(app);

// Use PORT environment variable or default to 3001
const port = process.env.PORT || 5000;
app.listen(port, () => {  
    console.log(`Server running successfully on port ${port}`);
});
