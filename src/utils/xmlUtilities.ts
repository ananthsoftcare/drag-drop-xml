import fs from "fs-extra";
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { MessageType } from "../interface/messageTypeEnum";
import { processXmlTemplate } from "./xmlBountintUtilities";
import { processSkuInt } from "./xmlSkuintUtilities";
import { getFileName, removeFile } from "./fileUtilities";

export const processXml = async (filePath: string) => {
	try {
		const xmlFile = fs.readFileSync(`${process.cwd()}${filePath}`, { encoding: 'utf8' });
		const parser = new XMLParser();
		const json = parser.parse(xmlFile);

		let jsonData;

		if (json) {
			const messageType = parseInt(MessageType[json.NETLOGMESSAGE?.MESSAGETYPE]);
			let data;
			switch (messageType) {
				case MessageType.INBOUNDINT:
					console.log("Processing Inbound");
					data = await processXmlTemplate('inbound', json);
					jsonData = createXML(data, filePath);
					break;
				case MessageType.OUTBOUNDINT:
					data = await processXmlTemplate('outbound', json);
					jsonData = createXML(data, filePath);
					break;
				case MessageType.SKUINT:
					data = await processSkuInt(json);
					break;

				default:
					break;
			}
		}

		return jsonData;

	} catch (error) {
		console.log(error);
	}
}

const createXML = async (data, filePath) => {
	const builder = new XMLBuilder({
		arrayNodeName: "NETLOGMESSAGE",
		//oneListGroup: true
	});
	const xmlContent = builder.build(data);
	const filename = getFileName(filePath);
	const file = 'success/' + filename.split('.')[0] + '.xml';

	const previewData = await generatePreviewData(file, filename, xmlContent);
	return previewData;
}

async function generatePreviewData(file, filename, xmlContent) {
	try {
		// Write the XML content to the file
		await fs.outputFile(file, xmlContent);

		// Read the file content
		const data = await fs.readFile(file, 'utf8');

		// Remove the temporary files after processing
		try {
			await fs.remove('processing/' + filename);
			await fs.remove('uploads/' + filename);
		} catch (err) {
			console.error(err, 'Error Removing file');
		}

		return data;
	} catch (err) {
		console.error(err);
	}
}