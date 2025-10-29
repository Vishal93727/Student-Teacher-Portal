import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail/sendEmail.js";
import crypto from "crypto";

const userRegistration=async(req,res)=>{
  try {

    const {name,email,password,isVerified,resetPasswordToken,resetPasswordExpires, phone }=req.body;
    // Assign role automatically based on endpoint
    let role = "student";
    if (req.path.includes("teacher")) role = "teacher";

    
        //check user is already exists
        let user=await User.findOne({email});
        if(user){
        return res.status(400).json({
            message:'User Already Exists!'
          });
        }
        
        
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        
        // generate verification token to verify
        const verificationToken= crypto.randomBytes(32).toString('hex');
        
        //create user 
        user=new User({
          ...req.body,
          name,
          email,
          password:hashPassword,
          phone,
          role,
          isVerified,
          verificationToken,
          resetPasswordToken,
          resetPasswordExpires,
        });
        await user.save();
        
        // verification link 
        
        
        
        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        //email content
      const emailContent=`
  <h1>  Email verification </h1>
  <p>   Click the link below to Verify your email: </p>
<a href="${verificationLink}" target="_blank">${verificationLink}</a>

  <p> This Link will expire in 1 hour...</p>
  
  `
        //send email to Verify
        
        await sendEmail(user.email,'verify your email',emailContent)
        //respond send on client 
        res.status(201).json({
          message: `${role} registered successfully`, user 
        // user
        });
        

        
  } catch (error) {
  console.error("Registration Error:", error);
  res.status(500).json({
    message: "Server side error",
    error: error.message,
  });
}

  
}

// const userLogin= async(req,res)=>{
//   try {
//     const {email,password}=req.body;
    
//     //check user Exists
//     let user=await User.findOne({email});
  
  
//   //compare password
//   const isMatch=await bcrypt.compare(password,user.password);
//   if(!isMatch){
//     return res.status(400).json({
//       message:"Invalid Email or Password"
//     })
//   };
  
//   //Generating Jwt resetPasswordToken
  
//   const token=jwt.sign({userId:user?._id,userEmail:user?.email},process.env.ACCESS_TOKEN,{
//     expiresIn:'1h'
//   })
  
//   //sending token as cookies
//   res.cookie('token',token,{
//     httpOnly:true,
//     secure:false,
//     sameSite:'strict'
//   } ).status(200).json({
//     message:"login Successfully"
//     //token
//   });
  
//   } catch (error) {
//     console.error(error.message);
//   }
// };


 const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, password, and role.",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No ${role} found with this email.`,
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4️⃣ Generate JWT token with role info
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    // 5️⃣ Send token as cookie and JSON
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: `${role} login successful.`,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

//uset password forgot to reset 
const userPasswordForget=async(req,res)=>{
  try {
  const {email}=req.body;
  //check user exist or import * as Notifications from 'expo-notifications';
  let user=await User.findOne({email});
  if(!user){
    return res.status(400).json({
      message:'Invalid Email....'
    })
  };
  
  //generating a password reset token
  
  const resetToken= crypto.randomBytes(32).toString('hex');
  
  //store reset token in user database
  user.resetPasswordToken=resetToken;
  user.resetPasswordExpires=Date.now()+3600000   /// token expoires in 1 hours...
  await user.save();
  
  
  //create userlink to reset resetPasswordExpires
  const resetLink=`${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
  
  //Email content
  const emailContent=`
  <h1>  Password reset Request </h1>
  <p>   Click the link below to reset your password: </p>
  <a href="${resetLink}" target="_blank>${resetLink}</a>
  <p> This Link will expire in 1 hour...</p>
  
  `
  
  //send email
  
  await sendEmail(user.email,'password reset Request',emailContent);
  res.status(200).json({
    message:'Password reset email send...'
  })
  
  } catch (error) {
  res.status(500).json({
    message:'password reset request failed '
  })
  }
}
  const userPasswordReset=async(req,res)=>{
    try {
      const {token}=req.params;
      const {password}=req.body;
      
      //finding user by reset token anf check token valid  or No
      const user= await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpires:{$gt:Date.now()}// check token expire or Not
      })
      if(!user){
        return res.status(400).json({
          message:'Inavlid or Expire token'
        })
      }
      
      //creating hash password
      const salt =await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(password,salt);
       
      //clear reset token field
      user.resetPasswordToken=undefined;
      user.resetPasswordExpires=undefined;
       
      // save user new password
      await user.save();
       
      res.status(200).json({
        message:'password reset Successfully...'
      })
    } catch (error) {
      res.status(500).json({
    message:'Failed to reset password '
    })
  }
}



///verify email
const userVerifyEmail=async(req,res)=>{
  try {
    const {token}=req.params;
    ///check verfivcataion token
    const user=await User.findOne({verificationToken:token});
    if(!user){
      return res.status(400).json({
        message:'Inavlid or verification token expire '
      })
    }
    
    //mark user isverified
    user.isVerified=true,
    user.verificationToken=undefined;
    
    await user.save();
    
    res.status(200).json({
      message:'Email verify Successfully...'
    })
    
  } catch (error) {
    res.status(500).json({
    message:'Email verification failed...'
    })
  }
}



//logout function
const userLogout=async(req,res)=>{
  try {
    res.clearCookie('token',{
      httpOnly:true,
      secure:false,
      sameSite:'strict'
    });
    
    res.status(200).json({
    message:'Logout Successfully...'
    });
    
  } catch (error) {
    res.status(500).json({
    message:'Failed to Logout...'
    })
  }
}

// PROFILE (get current user)
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", err });
  }
};

// STUDENT ASSIGNMENTS
const getStudentAssignments = async (req, res) => {
  const { studentName } = req.params;
  const submissions = await Submission.find({ studentName }).populate("assignmentId");
  res.json(submissions);
};

// GRADES
const getGrades = async (req, res) => {
  const grades = await Submission.find().select("studentName grade assignmentId");
  res.json(grades);
};

export default {
  userRegistration,
  userLogin,
  userPasswordForget,
  userPasswordReset,
  userVerifyEmail,
  userLogout,
  getProfile,
  getGrades,
  getStudentAssignments,

};



// import User from "../Models/user.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sendEmail from "../utils/sendEmail/sendEmail.js";
// import crypto from "crypto";

// // ✅ USER REGISTRATION
// const userRegistration = async (req, res) => {
//   try {
//     const { name, email, password, phone, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const verificationToken = crypto.randomBytes(32).toString("hex");

//     user = new User({
//       name,
//       email,
//       password: hashPassword,
//       phone,
//       role,
//       isVerified: false,
//       verificationToken,
//     });

//     await user.save();

//     const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

//     const emailContent = `
//       <h1>Email Verification</h1>
//       <p>Click the link below to verify your email:</p>
//       <a href="${verificationLink}" target="_blank">${verificationLink}</a>
//       <p>This link will expire in 1 hour.</p>
//     `;

//     await sendEmail(user.email, "Verify your email", emailContent);

//     res.status(201).json({
//       message: "User registration successful. Please check your email to verify your account.",
//     });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ message: "Server side error" });
//   }
// };

// // ✅ USER LOGIN
// const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     if (!user.isVerified)
//       return res.status(403).json({ message: "Please verify your email before logging in" });

//     const token = jwt.sign(
//       { userId: user._id, userEmail: user.email },
//       process.env.ACCESS_TOKEN,
//       { expiresIn: "1h" }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "strict",
//       })
//       .status(200)
//       .json({
//         message: "Login successful",
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ PASSWORD FORGOT
// const userPasswordForget = async (req, res) => {
//   try {
//     const { email } = req.body;
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email" });

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
//     const emailContent = `
//       <h1>Password Reset Request</h1>
//       <p>Click the link below to reset your password:</p>
//       <a href="${resetLink}" target="_blank">${resetLink}</a>
//       <p>This link will expire in 1 hour.</p>
//     `;

//     await sendEmail(user.email, "Password Reset Request", emailContent);

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).json({ message: "Password reset request failed" });
//   }
// };

// // ✅ PASSWORD RESET
// const userPasswordReset = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to reset password" });
//   }
// };

// // ✅ EMAIL VERIFY
// const userVerifyEmail = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const user = await User.findOne({ verificationToken: token });
//     if (!user) return res.status(400).json({ message: "Invalid or expired verification token" });

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Email verification failed" });
//   }
// };

// // ✅ LOGOUT
// const userLogout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to logout" });
//   }
// };

// // ✅ PROFILE
// const getProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching profile", err });
//   }
// };
// const getStudentAssignments = async (req, res) => {
//   const { studentName } = req.params;
//   const submissions = await Submission.find({ studentName }).populate("assignmentId");
//   res.json(submissions);
// };

// // GRADES
// const getGrades = async (req, res) => {
//   const grades = await Submission.find().select("studentName grade assignmentId");
//   res.json(grades);
// };

// export default {
//   userRegistration,
//   userLogin,
//   userPasswordForget,
//   userPasswordReset,
//   userVerifyEmail,
//   userLogout,
//   getProfile,
//   getGrades,
//   getStudentAssignments,

// };
