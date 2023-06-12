const express =require('express')
const router=express.Router();

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
    if (password.length<6){
        err.push({msg: 'Please should be at least 6 character' }) 
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
        res.send('pass')
    }
})

module.exports=router;