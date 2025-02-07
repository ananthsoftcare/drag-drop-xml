import fs from 'fs';
import { parse } from 'json2csv';

export const saveCsv = async (path, csvData) => {
    const csv = parse(csvData);
    
    // Output CSV to console or write to a file
    await fs.writeFileSync(path, csv);  // Write to output.csv file
}

