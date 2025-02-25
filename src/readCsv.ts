import { getFileName, getExtension, copyFile, removeFile } from './utils/fileUtilities';
import { processCsv } from './utils/csvToXmlUtilities';

export async function parseCsvFile(src: string) {

    const filename = getFileName(src);
    try {
        const fileExtension = getExtension(src);

        if (fileExtension !== '.csv') {
            throw new Error(`Invalid File Extension : ${fileExtension}. only csv files are allowed`);
        }

        //await removeFile(`original/${filename}`);
        //await removeFile(`processing/${filename}`);

        await copyFile(src, `original/${filename}`);
        await copyFile(src, `processing/${filename}`).then(() => {
            processCsv(`\\processing\\${filename}`);
        });

    } catch (err) {
        await copyFile(src, `failiur/${filename}`);
        await removeFile(`original/${filename}`);
        await removeFile(`processing/${filename}`);
        console.error('ERROR parseXmlFile ', err)
    }
}