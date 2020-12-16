const express = require('express');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/category', (req, res) => {
  res.render('category');
});

app.get('/details', (req, res) => {
  res.render('details');
});

app.use((req, res) => {
  res.status(404).render('notFound');
});

app.listen(app.get('port'), () => {
  console.log('server listen');
});