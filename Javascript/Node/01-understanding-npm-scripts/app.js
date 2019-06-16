const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('hbs', expressHbs({
  extname: '.hbs',
  defaultLayout: 'error-404',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views')
}))
//app.set('view engine', 'pug');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);
app.use(express.static('public'));

app.use((req, res,next)=> {
  res.status(404).render('error-404', {pageTitle: 'Page not Found'});
})

app.listen(3000);