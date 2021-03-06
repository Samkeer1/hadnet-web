const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const { db } = require('../database/index');
const port = process.env.PORT || 3000;
const path = require('path');

//routers
const auth = require('./routes/auth');
const businesses = require('./routes/businesses');
const community = require('./routes/community');
const user = require('./routes/user.js')
const review = require('./routes/review.js')

//middleware
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../dist/hadnet')));

// authentication route
app.use('/api/auth', auth);
// businesses route
app.use('/api/business', businesses)
// user route
app.use('/api/user', user)
// community route
app.use('/api/community', community);
// review route
app.use('/api/review', review)

app.listen(port, () => console.log(`Server is listening on port ${port}`));