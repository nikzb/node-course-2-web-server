const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Two arguments: url, function to run
  // Two arguments to function are request info and response
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page for Fake Website',
    welcomeMessage: 'Welcome to this fake website!'
  });

  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Niko',
  //   likes: [
  //     'Tennis',
  //     'Soccer'
  //   ]
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});



// Simulate sending back an errorMessage
app.get('/bad', (req, res) => {
  res.send({errorMessage: 'Unable to handle request'});
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
