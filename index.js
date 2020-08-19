// express, listen, etc
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./router');

// env expectations:
// CN_ACCESS_KEY, CN_APP_PORT, CN_SQL_USERNAME, CN_SQL_PW

const app = express();

app.use(morgan('short'));
app.use(router);
app.use(express.static(path.resolve(__dirname, 'dist')));

const PORT = process.env.CN_APP_PORT || 3001;

app.listen(PORT, (e) => {
  if (e) {
    console.log('error detected: \n', e);
    process.exit(0);
  } else {
    console.log(`now listening on port ${PORT}`);
  }
});
