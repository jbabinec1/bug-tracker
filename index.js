
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const port = 3000;
var bug = require('./bug');
var path = require('path');
import Bug from './bug';
const dotenv = require('dotenv'); 
dotenv.config({path: './config.env'});

const app = express();
const router = express.Router();

 app.use(cors());
 app.use(bodyParser.json());

  app.use( function (req, res, next){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('ACCESS-CONTROL-ALLOW-HEADERS', 'CONTENT-TYPE, AUTHORIZATION, CONTENT-LENGTH, X-REQUESTED-WITH'
    );
    next();
}); 

/*HMM  app.use(bodyParser.urlencoded({
    extended: true
})); */

//27017


let env = process.env.Database;

 mongoose.connect(env, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
 const connection = mongoose.connection; 
 connection.once('open', () => {
  console.log('mongodb connection established')
})

//mongodb://127.0.0.1:27017/bugs?authSource=admin   local db

//mongodb+srv://jared:honey2856@cluster0-jfv17.mongodb.net/Issues?retryWrites=true&w=majority   hosted db



//Add new bug document to collection
router.route('/bugs/add').post((req, res) => {
  let bug = new Bug(req.body);
  bug.save()
      .then(bug => {
          res.status(200).json({'issue': 'Added successfully'});
      })
      .catch(err => {
          res.status(400).send('Failed to create new record');
      });
});

// Get list of bugs 
router.route('/bugs/').get((req, res) => {
  Bug.find((err, bugs) => {
      if (err)
          console.log(err);
      else
          res.json(bugs);
          
  });
});

//Get one specific bug 
router.route('/bugs/:id').get((req, res) => {
  Bug.findById(req.params.id, (err, bug) => {
      if (err)
          console.log(err);
      else
          res.json(bug);
  })
});


// Update or edit bugs 
router.route('/bugs/update/:id').post((req, res) => {
  Bug.findById(req.params.id, (err, bug) => {
      if (!bug)
          return next(new Error('Could not load Document'));
      else {
          bug.title = req.body.title;
          bug.reporter = req.body.reporter;
          bug.description = req.body.description;
          bug.type = req.body.type;
          bug.status = req.body.status;

          bug.save().then(bug => {
              res.json('Update done');
          }).catch(err => {
              res.status(400).send('Update failed');
          });
      }
  });
});


router.route('/bugs/delete/:id').get((req, res) => {
  Bug.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
      if (err)
          res.json(err);
      else
          res.json('Removed successfully');
  });
});



/* Old way of routing possibly .. hmmmmm
app.post('/bug', function (request, response) {  
response.send(request.body);

  }) */


/*  Don't delete this yet.. but probably don't need it

app.get('/', function(req, res){
  console.log('reloading');
  res.sendFile('src/index.html', {root: __dirname})
}) */  




 /* app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './src/index.html'));
 }); 
 
 */

 

app.use('/', router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))