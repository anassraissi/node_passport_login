const express =require('express')
const router=express.Router();
const User=require('../model/User');
const bcrypt=require('bcryptjs');

// login page
router.get('/login',(req,res)=> res.render('login'))
//register page
router.get('/register',(req,res)=> res.render('register'))
//post register

router.post('/register',(req,res)=>{

    const {name,email,password,password2}=req.body
    let err=[];

    //check required fields
    if (!name ||!email || !password || !password2 ) {
        err.push({msg:'Please fill all the fields'})
    } 
    
    //check password match
    if (password!=password2){
        err.push({msg: 'passwords do not match '}) 
    }
    
    //check pass length
    if (password && password.length<6){
        err.push({msg: ' Please password should be at least 6 character' }) 
    } 
    
    if(err.length>0){
        res.render('register',{
            err,
            name,
            email,
            password,
            password2
        })
        console.log(err)
    }
    else{

           //Validation passed
           User.findOne({email:email})
           .then(user=>{
            if(user){
                err.push({msg: 'Email is already registred'});
                res.render('register',{
                    err,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else{
                const newUser=new User({
                    name,
                    email,
                    password,
                });
                //hashing password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err
                    //set password to hash
                    newUser.password=hash
                    //save user
                    newUser.save()
                    .then(user=>{
                        req.flash('success_msg','you are now registred and you can log in')
                        res.redirect('/users/login')
                    })
                    .catch(err=>{console.log(err) })
                    });

            })
            
        } 
                
    })
    }
})

module.exports=router;