const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User=require('./Model/User')
const server = express()

server.use(cors())
server.use(bodyParser.json())

mongoose.connect('mongodb+srv://prachidongare22:prachi2323@cluster0.obugcmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err))

server.post('/register',async(req,res)=>{
    try{
    const{fullname,username,age,password}=req.body
    const userObj=new User({fullname,username,age,password})
    await userObj.save()

    res.json({
        status:true,
        message:"success"
    })
    }catch(error){
        res.json({status:false,
            message:`Error: ${error}`
    })
    }
})
server.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.json({
          status: false,
          message: 'User does not exist'
        });
      }
  
      if (user.password !== password) {
        return res.json({
          status: false,
          message: 'Wrong password'
        });
      }
  
      res.json({
        status: true,
        message: 'Login successful'
      });
  
    } catch (error) {
      res.json({
        status: false,
        message: `Error: ${error}`
      });
    }
  });
    

server.listen(8055, () => {
  console.log("Server is running on port 8055")
})
