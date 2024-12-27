import User from '../model/user.js'
import bcrypt from 'bcryptjs'

export const getalluser = async (req,res,next)=>{
    let users;
    try{
          users = await User.find();
    }
    catch(err){
         console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"no users found"});

    }
    return res.status(200).json({users});
}

export const signup = async (req,res,next)=>{
      
    const {name,email,password} =req.body;

    let existinguser;
    try{
        existinguser = await  User.findOne({email}) 
    }
    catch(err){
        return console.log(err);
    }
    if(existinguser){
        return res.status(400).json({mesage:"user already exists"})
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User ({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });

    try{
         await user.save();
    }
    catch(err){
        return console.log(err);
    }
    return res.status(201).json({user})
}

export const login = async (req,res,next)=>{

   const {email , password} =req.body;
   let existinguser;
   try{
       existinguser = await  User.findOne({email}) 
   }
   catch(err){
       return console.log(err);
   }
   if(!existinguser){
       return res.status(404).json({mesage:"could not find user by this email"})
   }

   const isPasswordCorrect = bcrypt.compareSync(password,existinguser.password)

   if(!isPasswordCorrect){
    res.status(400).json({message:"password is incorrect"})

   }

   return res.status(200).json({message:"Login successfull",user : existinguser})
    

}