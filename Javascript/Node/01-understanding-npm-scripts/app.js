const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);
app.use(express.static('public'));

app.use((req, res,next)=> {
  res.status(404).sendFile(path.join(__dirname, 'views','error-404.html'));
})

app.listen(3000);