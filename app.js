

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());


app.use('/api/schools', schoolRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
