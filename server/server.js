const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config/.env' });

// set up express
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send("oke");
});

const PORT = 5000;

app.listen(PORT, () => {
   console.log(`running on ${PORT}`);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}, (err) => {
    if(err) throw err;
    console.log("mongoDB connection established");
});

app.use('/users', require('./routes/userRoutes'));
app.use('/todos', require('./routes/todoRouter'));