const express = require('express')
const app = express()
const port = 3000
bodyParser = require('body-parser');
var path = require('path');
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router()

mongoose.connect('');
const connection = mongoose.connection; 
connection.once('open', () => {
  console.log('mongo works')
})

app.use('/', router);



  app.all("/*", function (req, res, next){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('ACCESS-CONTROL-ALLOW-HEADERS', 'CONTENT-TYPE, AUTHORIZATION, CONTENT-LENGTH, X-REQUESTED-WITH'
    );
    next();
}); 



app.post('/bug', function (request, response) {  
response.send(request.body);

  })





/*  Don't delete this yet.. but probably don't need it

app.get('/', function(req, res){
  console.log('reloading');
  res.sendFile('src/index.html', {root: __dirname})
}) */  




 /* app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './src/index.html'));
 }); 
 
 */

 

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))