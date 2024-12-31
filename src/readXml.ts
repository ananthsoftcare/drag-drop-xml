import { getFileName, getExtension, copyFile, removeFile } from './utils/fileUtilities';
import { processXml } from './utils/xmlUtilities';

export async function parseXmlFile(src: string) {

	const filename = getFileName(src);
	try {
		const fileExtension = getExtension(src);

		if (fileExtension !== '.xml') {
			throw new Error(`Invalid File Extension : ${fileExtension}. only xml files are allowed`);
		}

		await removeFile('processing/');
		await removeFile('original/');

		await copyFile(src, `original/${filename}`);
		await copyFile(src, `processing/${filename}`).then(() => {
			processXml(`\\processing\\${filename}`);
		});

	} catch (err) {
		await removeFile(`original/${filename}`);
		await removeFile(`processing/${filename}`);
		console.error(err)
	}
}