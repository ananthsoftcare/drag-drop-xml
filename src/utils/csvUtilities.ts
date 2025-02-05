import fs from 'fs';
import { parse } from 'json2csv';

export const saveCsv = (path, csvData) => {
    const csv = parse(csvData);
    
    // Output CSV to console or write to a file
    console.log(csv);
    fs.writeFileSync(path, csv);  // Write to output.csv file
}

