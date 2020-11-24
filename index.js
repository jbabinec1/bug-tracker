
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
const { promisify } = require('util');
//const util = require('util');
var bug = require('./bug');
var path = require('path');
import Bug from './bug';
import { Comment } from './comment';
import User from './user';
const jwt = require('jsonwebtoken');


const catchAsync = require('./catchAsync');

import { retryWhen } from 'rxjs-compat/operator/retryWhen';
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

 

let loc = `mongodb://127.0.0.1:27017/bugs?authSource=admin`;

 mongoose.connect(env, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
 const connection = mongoose.connection; 
 connection.once('open', () => {
  console.log('mongodb connection established')
})

//mongodb://127.0.0.1:27017/bugs?authSource=admin   local db
//let secret= '';

let secret ='my-ultra-secure-and-ultra-long-secret'

const signToken = id => {
  return jwt.sign({ id }, secret, {expiresIn: '90d'});
}



let token;


let protect = catchAsync(async(req, res, next) =>  {  

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    token = req.headers.authorization.split(' ')[1];

  }

  if(!token) {
    console.log('Access denied.')
    return res.status(401).json({'Access': 'denied. Please log in.'});
  }


  //Verify token sent in header is valid
  let decoded = await promisify(jwt.verify)(token, secret);
  console.log(decoded);


  //Check if user still exists 
  const freshUser = await User.findById(decoded.id);

  if(!freshUser) {
    return res.status(401).json({'Error': 'User belonging to token no longer exists'});
  }




 req.user = freshUser;
  next();
})



 

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


// Get Users
/*
router.route('/users/').get(protect,(req, res) => {

  User.find((err, user) => {
      if (err)
          console.log(err);
      else
          res.json(user);
          
  }); 
  
}); */





app.get('/users/', protect, (request, res, err) => {

  User.find((err, user) => {
    if (err)
        console.log(err);
    else
        res.json(user);
        
}); 


}) 


//Signup user
router.route('/signup').post((req, res) => {
  let user = new User({
    name: req.body.name,
    platform:req.body.platform,
    password:req.body.password});

    //const token = signToken(user._id);
  user.save()
      .then(user => {
          res.status(200).json({'user': 'Added successfully', token, data: {user:user}});
      })
      .catch(err => {
          res.status(400).send('Failed to create new user');
      });

      

      const token = signToken(user._id);

      
      //jwt.sign({id: user._id }, process.env.JWT_Secret, {expiresIn: '90d'})

});


   



//Login user 

router.route('/login/').post(async(req, res) => {

  const {name, password} = req.body;

//If no name or password were requested, pls provide user and apss
  if(!name || !password) {
    return res.status(400).send('Please provide username and password!');
  }

  let user = await User.findOne({ name }).select('+password');
  

  if(!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).send('wrong username or password')
  }

 console.log(user);

 const token = await signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  })
 

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


// Get list of comments
router.route('/comments/').get((req, res) => {
  Comment.find((err, comments) => {
      if (err)
          console.log(err);
      else
          res.json(comments);
          
  });
});

//Find comments for specific bug..
router.route('/comments/:id').get((req, res) => {
  Comment.findById(req.params.id, (err, bug) => {
    if (err)
        console.log(err);
    else
        res.json(bug);
})

});


  router.route('/comments/add').post((req, res) => {
  
  let comment = new Comment(req.body);
  comment.save()
      .then(comment => {
          res.status(200).json({'comment': 'Added successfully mehhhhh'});
          console.log(comment)
      })
      .catch(err => {
          res.status(400).send('Failed to create new record');
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





// Code that actually works and doesn't look like complete shit 

router.post('/comment', (req, res) => {
  // Check if comment was provided in request body
  if (!req.body.comment) {
    res.json({ success: false, message: 'No comment provided' }); // Return error message
  } else {
    // Check if id was provided in request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided' }); // Return error message
    } else {
      // Use id to search for bug in database
      Bug.findOne({ _id: req.body.id }, (err, bug) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid bug id' }); // Return error message
        } else {
          // Check if id matched the id of any blog post in the database
          if (!bug) {
            res.json({ success: false, message: 'Bug not found.' }); // Return error message
          } else {
                  // Add the new comment to the blog post's array
                  bug.comments.push({
                    comment: req.body.comment, // Comment field
                    commenter: req.body.commenter // Person who commented
                  });
                  // Save blog post
                  bug.save((err) => {
                    // Check if error was found
                    if (err) {
                      res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                    } else {
                      res.json({ success: true, message: 'Comment saved' }); // Return success message
                    }
                  });         
          }
        }
      });
    }
  }
});  // End of me being tired */










 

app.use('/', router);

app.use(express.static('dist/bug-test'));

app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/bug-test/index.html'));
}); 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))