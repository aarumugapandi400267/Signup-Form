import XL from 'xlsx';

const excelFilePath = 'template.xlsx';

const workbook = XL.readFile(excelFilePath);

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const data = XL.utils.sheet_to_json(worksheet);

// Output the data
console.log(data[0]);

