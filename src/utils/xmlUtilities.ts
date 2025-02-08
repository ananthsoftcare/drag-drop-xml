import fs from "fs-extra";
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { MessageType } from "../interface/messageTypeEnum";
import { processXmlTemplate } from "./xmlBountintUtilities";
import { processSkuInt } from "./xmlSkuintUtilities";
import { getFileName, removeFile } from "./fileUtilities";

import { config } from '../../config';

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
					data = await processXmlTemplate(config.xmlType.INBOUND, json);
					jsonData = createXML(data, filePath);
					break;
				case MessageType.OUTBOUNDINT:
					data = await processXmlTemplate(config.xmlType.OUTBOUND, json);
					jsonData = createXML(data, filePath);
					break;
				case MessageType.SKUINT:
					const filename = getFileName(filePath);
					data = await processSkuInt(json, filename);
					break;

				default:
					break;
			}
		}

		return jsonData;

	} catch (error) {
		console.log('ERROR processXml ', error);
	}
}

const createXML = async (data, filePath) => {
	try {
		const builder = new XMLBuilder({
			// arrayNodeName: "NETLOGMESSAGE",
			arrayNodeName: config.xmlOptions.arrayNodeName,
			//oneListGroup: true
		});
		const xmlContent = builder.build(data);
		const filename = getFileName(filePath);
		// const file = 'success/' + filename.split('.')[0] + '.xml';
		const file = `${config.paths.success}${filename.split(".")[0]}.xml`;
		const previewData = await generatePreviewData(file, filename, xmlContent);
		return previewData;
	} catch (err) {
		console.error('ERROR createXML ', err);
	}
}

async function generatePreviewData(file, filename, xmlContent) {
	try {
		// Write the XML content to the file
		await fs.outputFile(file, xmlContent);

		// Read the file content
		const data = await fs.readFile(file, 'utf8');

		// Remove the temporary files after processing
		try {
			// await fs.remove('processing/' + filename);
			await fs.remove(`${config.paths.processing}${filename}`);
			// await fs.remove('uploads/' + filename);
			await fs.remove(`${config.paths.uploads}${filename}`);
		} catch (err) {
			console.error(err, 'Error Removing file');
		}

		return data;
	} catch (err) {
		console.error(err);
	}
}