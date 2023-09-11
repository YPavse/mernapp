const express =require ('express')

const router = express.Router()

const User =require('../models/User')

const { body, validationResult } = require('express-validator');

    router.post("/createuser",[

    body('email').isEmail(),

    body('name').isLength({ min: 5 }),
   
    body('phoneno').isLength({ min: 10, max: 10 }),
   
    body('password').isLength({ min: 6 })],     

    async(req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

            try {
              await User.create({
                    name: req.body.name,
                    password:req.body.password,
                    email:req.body.email,   
                    phoneno:req.body.phoneno,   
                    location:req.body.location
                })
                res.json({success:true});
            } catch (error) {
                console.log(error)
                res.json({success:false});
            }
    })

    


    router.post("/loginuser", [

        body('email').isEmail(),
       
        body('password').isLength({ min: 6 })],     
        
        async(req,res)=>{

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
     
    
       let email= req.body.email   ; 
       

    
                try {
                let userdata =  await User.findOne({email});
                    if(!userdata){
                        return res.status(400).json({ errors:"Try With Correct Credentials" });
                    }
                if(req.body.password !==userdata.password){
                    return res.status(400).json({ errors:"Try With Correct Credentials" }); 
                }
                return res.json({success:true });

                } catch (error) {
                    console.log(error)
                    res.json({success:false});
                }
        })
      
    module.exports = router;
