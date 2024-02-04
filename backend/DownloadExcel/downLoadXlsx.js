import XLSX from 'xlsx'
import fs from 'fs'
import {promisify} from 'util'


const writeFilePromise = promisify(fs.writeFile);

const downLoadXlsx=async (req, res) => {
    const columns = ['Firstname','Lastname','Gender','DateOfBirth','Address','City','Taluk',
    'District','State','Pincode','StudentPhone','ParentPhone','Email','SchoolName',
    'SchoolType','EducationLevel','StudyMedium','SchoolLocation','ScholarShip','Sport','SportLevel',
  ];
    const data = []; // Add your data here if needed
  
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const filePath = 'template.xlsx';
    try {
        await writeFilePromise(filePath, XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }));
        const fileStream = fs.createReadStream(filePath);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
  
        fileStream.pipe(res);
        fileStream.on('end', () => {
            fs.unlinkSync(filePath);
        });
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  export {downLoadXlsx}