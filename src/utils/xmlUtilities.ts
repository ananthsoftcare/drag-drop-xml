import fs from "fs-extra";
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { MessageType } from "../interface/messageTypeEnum";
import { processInbountInt } from "./xmlInbountintUtilities";
import { processOutbountInt } from "./xmlOutbountintUtilities";
import { processSkuInt } from "./xmlSkuintUtilities";
import { getFileName, removeFile } from "./fileUtilities";

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
					data = await processInbountInt(json);
					// store to database

					break;
				case MessageType.OUTBOUNDINT:
					data = await processOutbountInt(json);
					break;
				case MessageType.SKUINT:
					data = await processSkuInt(json);
					break;

				default:
					break;
			}
			createInboudXML(data, filePath);
		}

	} catch (error) {
		console.log(error);
	}
}

const createInboudXML = (data, filePath) => {
	const builder = new XMLBuilder({
		arrayNodeName: "NETLOGMESSAGE",
		//oneListGroup: true
	});
	const xmlContent = builder.build(data);
	const filename = getFileName(filePath);
	const file = 'success/'+filename.split('.')[0]+'.xml';

	fs.outputFile(file, xmlContent)
		.then(() => fs.readFile(file, 'utf8'))
		.then(data => {
			console.log('success') // => hello!
			removeFile('processing/'+filename).then(() => {
				console.log('REMOVE SUCCESSSSSSSSSS')
			}).catch(err => {
				console.log(err, '+++++++')
			})
		})
		.catch(err => {
			console.error(err)
		})
}

