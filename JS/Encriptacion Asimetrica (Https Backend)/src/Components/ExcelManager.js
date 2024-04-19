import xlsx from 'xlsx';


export default class ExcelManager {

    static readFile = (filePath) => {
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const [data] = xlsx.utils.sheet_to_json(worksheet);
        return data;
    }

    static writeFile = ({ data, filename }) => {
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        xlsx.writeFile(wb, filename);
    }



}
