const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const list = require('./list');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    list,
  });
});

app.use('/api/list', require('./routes/api/list'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
