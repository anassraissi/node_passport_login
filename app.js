const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const mongoose=require('mongoose');
var flash = require('connect-flash');
const session=require('express-session')

const PORT=process.env.PORT || 5000

//Db config
const db=require('./config/keys').MongoURI;

//connect to Mongo

mongoose.connect(db,{useNewUrlParser:true})
.then(()=>{console.log('MongoDb Connected')})
.catch(err=>console.log('errr'))
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');
//bodyParser

app.use(express.urlencoded({extended:false}));

/**
 * The express.urlencoded() function is a built-in middleware function in Express.
 *  It parses incoming requests with URL-encoded payloads and is based on a body parser.
    If extended is false, you can not post "nested object"
 */

    // express session

    app.use(session({ 		//Usuage
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));

    // connect flash 
      app.use(flash())
      
     // global variables  for flash error and success
     app.use((req,res,next)=>{

         res.locals.success_msg=req.flash('success_msg') 
         res.locals.error_msg=req.flash('error_msg')

         next();
     }) 

//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users')) // import all route that have user.js file

app.listen(PORT,console.log(`Server started on port ${PORT}`));
