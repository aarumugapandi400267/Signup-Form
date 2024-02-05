import { parseArgs } from 'util';
import { collection } from '../Database/Collection.js';
import { transporter } from '../Transporter/Transporter.js';
import { randomBytes } from 'crypto';
import  Moment  from 'moment-timezone';
const PORT=3002

Moment.tz.setDefault('Asia/Kolkata')
const RegisterFun= async (req, res) => {


    try {
      const { firstname,lastname,gender,dob,address,state,district,taluk,city,pincode,
        email,studentphone,parentphone,schoolname,educationlevel,schooltype,studymedium,
        schoollocation,scholarship,sports,sportlevel
      } = req.body;

      console.log(dob)
      const verificationToken = randomBytes(20).toString('hex');
      
      let isAlreadyVerified= await collection.findOne({Email:email})
  
      if(!isAlreadyVerified){
        await collection.insertOne({ 
        FirstName:firstname,
        LastName:lastname,
        Gender:gender,
        DateOfBirth:dob,
        Address:address,
        City:city,
        Taluk:taluk,
        District:district,
        State:state, 
        Pincode:pincode,
        StudentPhone:studentphone,
        ParentPhone:parentphone,
        Email:email,
        SchoolName:schoolname,
        SchoolType:schooltype,
        EducationLevel:educationlevel,
        StudyMedium:studymedium,
        SchoolLocation:schoollocation,
        ScholarShip:scholarship,
        Sport:sports,
        SportLevel:sportlevel,
        RegisteredAt:Moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        VerificationToken:verificationToken,
        isVerified:false
      })
      const mailOptions = {
        from: 'aarumugapandi762004@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:${PORT}/verify/${email}/${verificationToken}`,
      };
      
      await transporter.sendMail(mailOptions);
      res.write("<title>Registration Status</title>")
      res.write("<h1>Registration successful. Check your email for verification</h1>");
      res.end()
      }else{
        res.send("<h1>All ready verified Mail</h1>"
        +"<p>Use Other Email</p>")
        return
      } 
      
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  export {RegisterFun}