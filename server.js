const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 5000;
const DBI_URI = 'mongodb://localhost:27017/project4';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(DBI_URI).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.error('Failed to connect to MongoDb', err);
});

app.use('/', authRoutes);

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`);}); 