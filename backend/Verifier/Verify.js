import { collection } from "../Database/Collection.js";

const linkVerifier = async (req, res) => {
  try {
    const token = req.params.token;
    const email = req.params.email;

    const user = await collection.findOne({ Email: email, VerificationToken: token });

    if (!user) {
      return res.status(404).send('Invalid verification token or email');
    }
    await collection.updateOne(
      { Email: email, VerificationToken: token },
      { $set: { isVerified: true, VerificationToken: 'verified' } }
    );

    res.status(200).send(`Email verified successfully. You can now log in.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const loginVerifier=async(req,res)=>{
  const {email,password}=req.body
  const loginUser= await collection.findOne({Email:email})
  if(loginUser==null) return res.send("Register Karo")
  if(loginUser){
    if(loginUser.VerificationToken!="verified"){
      return res.send("Email Not verified")
    }
    if(loginUser.Password!=password){
      return res.send("In Correct Password")
    }
    return res.send("Logged In")
  }
}


export { linkVerifier , loginVerifier};
