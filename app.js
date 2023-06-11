const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const mongoose=require('mongoose');
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

//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.listen(PORT,console.log(`Server started on port ${PORT}`));
