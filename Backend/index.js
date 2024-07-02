const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

app.use(cors({
  origin: '',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static(path.join(__dirname, 'Frontend/app/build')));
app.use(express.json());

const UserRouter = require('./Router/UserRouter');
const AdminRouter = require('./Router/AdminRouter');
const CompanyRouter = require('./Router/CompanyRouter');

mongoose.connect(process.env.MongoUrl).then(() => {
  console.log("data base is connected");
}).catch((err) => {
  console.log(err);
});

app.use('/home', UserRouter);
app.use('/Admin', AdminRouter);
app.use('/company', CompanyRouter);

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'Frontend/app/build', 'index.html'));
  } catch (error) {
    next(error);
  }
});

app.listen(5000, () => {
  console.log(`port 5000 is connected`);
});
