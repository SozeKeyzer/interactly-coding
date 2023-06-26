const express = require('express');
const bodyParser = require('body-parser');

const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(bodyParser.json());
app.use(contactRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});