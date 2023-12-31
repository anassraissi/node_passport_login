const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

//load User Model
const User=require('../model/User')

module.exports=function(passport){

    passport.use(

            new LocalStrategy({usernameField:'email'},(email,password,done)=>{
                //match User
                User.findOne({email:email})
                .then(user=>{
                    if(!user){
                        return done(null,false,{message:' that email is not registred'})                        
                    }

                //match password
                    bcrypt.compare(password,user.password,(err,isMatch)=>{

                        if(isMatch){
                            return done(null,user)
                        }
                        else{

                            return done(null,false,{message: 'password incorrect'});
                        }

                    })

                })
                .catch(err=> console.log(err))

            })
    )
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });


}