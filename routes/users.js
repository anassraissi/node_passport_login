const express =require('express')
const router=express.Router();

// login page
router.get('/login',(req,res)=> res.send('login page '))
//register page
router.get('/register',(req,res)=> res.send('register page'))

module.exports=router;