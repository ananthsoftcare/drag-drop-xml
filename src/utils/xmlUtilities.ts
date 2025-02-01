import fs from "fs-extra";
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { MessageType } from "../interface/messageTypeEnum";
import { processXmlTemplate } from "./xmlBountintUtilities";
import { processSkuInt } from "./xmlSkuintUtilities";
import { getFileName, removeFile } from "./fileUtilities";
import xml2js from 'xml2js';

export const processXml = async (filePath: string) => {
	try {
		const xmlFile = fs.readFileSync(`${process.cwd()}${filePath}`, 'utf8');
		const parser = new XMLParser();
		const json = parser.parse(xmlFile);

		if (json) {
			const messageType = parseInt(MessageType[json.NETLOGMESSAGE?.MESSAGETYPE]);
			let data;
			switch (messageType) {
				case MessageType.INBOUNDINT:
					data = await processXmlTemplate('inbound', json);
					createXML(data, filePath);
					break;
				case MessageType.OUTBOUNDINT:
					data = await processXmlTemplate('outbound', json);
					createXML(data, filePath);
					break;
				case MessageType.SKUINT:
					data = await processSkuInt(json);
					break;

				default:
					break;
			}
		}

	} catch (error) {
		console.log(error);
	}
}

const createXML = (data, filePath) => {
	const builder = new XMLBuilder({
		arrayNodeName: "NETLOGMESSAGE",
		//oneListGroup: true
	});
	const xmlContent = builder.build(data);
	const filename = getFileName(filePath);
	const file = 'success/' + filename.split('.')[0] + '.xml';

	fs.outputFile(file, xmlContent)
		.then(() => fs.readFile(file, 'utf8'))
		.then(data => {
			console.log('success') // => hello!
			removeFile('processing/' + filename).then(() => {
				console.log('REMOVE SUCCESSSSSSSSSS')
			}).catch(err => {
				console.log(err, '+++++++')
			})
		})
		.catch(err => {
			console.error(err)
		})
}

export const parseXmlToJson = async (xmlData) => {
	const parser = new xml2js.Parser();
	return new Promise((resolve, reject) => {
		parser.parseString(xmlData, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};