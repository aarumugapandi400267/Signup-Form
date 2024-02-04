import express from 'express';
import bodyParser from 'body-parser';
import { RegisterFun } from './backend/Register/Register.js';
import { loginVerifier, linkVerifier } from './backend/Verifier/Verify.js';
import { downLoadXlsx } from './backend/DownloadExcel/downLoadXlsx.js';
import { Home } from './backend/Home/Home.js';
import { upload,uploadFile } from './backend/UploadExcel/Uploadfile.js';

const app = express();
const PORT = 3002;

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))


app.get('/',Home)
app.post('/register',RegisterFun); 
app.post('/login', loginVerifier);
app.get('/verify/:email/:token',linkVerifier)
app.get('/download-excel',downLoadXlsx);
app.post('/upload-excel',upload.single('fileUpload'),uploadFile)
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
