const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const routes = require('./routes/index.js'); //! 여기 수정 해봄

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  })
);
app.use('/api', routes);

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`${process.env.PORT || 3000} 포트에 접속 되었습니다.`);
});
