import multer from 'multer'
import xlsx from 'xlsx'
import { collection } from '../../backend/Database/Collection.js';
import { transporter } from '../../backend/Transporter/Transporter.js';
import { randomBytes } from 'crypto';
import { error } from 'console';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PORT = 3002;
 
const uploadFile=async(req,res)=>{
    const fileBuffer = req.file.buffer
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet,{raw:false});
  
    let AlreadyExistMails=[]
    
    let isAlreadyVerified
    for(let i=0;i<data.length;i++){
      isAlreadyVerified=await collection.findOne({Email:data[i].Email})
      if(isAlreadyVerified==null){
        const verificationToken = randomBytes(20).toString('hex');
        const MailOption={
            from:"aarumugapandi762004@gmail.com",
            to:data[i].Email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: http://localhost:${PORT}/verify/${data[i].Email}/${verificationToken}`,
        }
        await transporter.sendMail(MailOption)
            .then(await collection.insertOne(data[i]))
            .catch(error=>{
                console.log(error)
            })
        
        // await collection.updateOne()
      }else{
        AlreadyExistMails.push(isAlreadyVerified.Email)
      }
    }
  
    if(AlreadyExistMails.length==0){
      res.send('File uploaded and processed successfully!');
    }else{
      res.write("<title>Emails Already Exist</title>")
      res.write("<style>*{text-align: center;}</style>")
      AlreadyExistMails.forEach(email=>{
      res.write(`<p>${email}</p>`+'\n')
      })
      res.write("<h1>These E-Mails are Already Exist</h1>")
      res.end()
    }
  }

  export{upload,uploadFile}