const express = require('express');
const path = require('path');
const {inputCleaner, inputValidator} = require ('./middleware')

const app = express();
const port = 3000

app.use(express.urlencoded({extended:true}));


app.get('/', (req,res) => {
  res.redirect('/form');
})
app.use(express.static('public'));

app.get('/form',(req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', inputCleaner, inputValidator, (req,res) => {
  res.json({username:req.body.username, comment:req.body.comment});
});

app.listen(port,() => {
  console.log(`Server running at http://localhost:${port}`)
});