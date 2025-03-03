const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.register = async (req, res) => {
    try{

        const { name, email, password } = req.body;


        const isExists=await User.findOne(
            {
                where:{
                    email:email
                }
            });

        if(isExists)
        {
           return res.json({
                success:false,
                data:{},
                message:"user already exists. Try with other credentails"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
      
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
      
        res.status(201).json({
          message: "Agent Registered Successfully!",
          user,
        });


    }
    catch(error)
    {
        console.log(error);

        res.json({
            success:false,
            data:{},
            error:error.message
        })
        
    }
   
  };



exports.login = async (req, res) => {

    try{
        const { email, password } = req.body;
  
        const user = await User.findOne(
            {
                where: { email } 
            });
      
        if (!user) {
          return res.status(404).json({ message: "Invalid Credentials" });
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
      
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid Credentials" });
        }
      
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
      
        res.json({
          message: "Agent Logged In ",
          token,
        });
    }
    catch(error)
    {
        console.log(error);

        res.json({
            success:false,
            data:{},
            error:error.message
        })
        
    }

  };
  