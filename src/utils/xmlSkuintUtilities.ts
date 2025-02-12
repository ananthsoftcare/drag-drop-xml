
import fs from "fs-extra";
import * as path from "path";
import { ISkuIntXML } from "../interface/skuint";
import { saveCsv } from './csvUtilities';
import { config } from "../../config";

const convertToCsv = (skuInputData) => {
	const jsonPath = path.join(__dirname, `../${config.paths.skuTemplate}`);
	const filedata = fs.readFileSync(jsonPath, 'utf-8');
	const skuTemplateJson = JSON.parse(filedata);
	const dataLevel2 = skuInputData.NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2;
	let result = [];
	dataLevel2.map((d2, i) => {
		let tempData: any = {};
		skuTemplateJson.forEach(sku => {
			const { tag, matchKey } = sku;
			let tagName = tag.toUpperCase();
			if (matchKey.includes('[~]')) {
				const matchKeyStr = matchKey.replace('~', i);
				tempData[tagName] = getArrVal(matchKeyStr, skuInputData);
			} else {
				tempData[tagName] = matchKey.split('.').reduce((o, i) => o[i], skuInputData);
			}
		});
		result.push(tempData);
	});

	return result;
}

const getArrVal = (tag, bountData) => {
	const res = tag.split('.').reduce((o, i) => {
		// Check if the current part of the path has an array index
		const arrayMatch = i.match(/(.*)\[(\d+)\]/);
		if (arrayMatch) {
			// If it's an array index, access the array and the correct index
			const arrayName = arrayMatch[1];  // The part before the array
			const index = parseInt(arrayMatch[2], 10);  // The index value
			o = o[arrayName][index];  // Access the array and the item at the given index
		} else {
			// If it's not an array, simply access the property
			o = o[i];
		}
		return o;
	}, bountData);
	return res;
}

export const processSkuInt = async (data: ISkuIntXML, filename: string) => {
	try {
		const output = convertToCsv(data);
		await saveCsv(config.csv.outputFileName, output);
		await fs.remove(config.paths.processing + filename);
	} catch (error) {
		await fs.remove(config.paths.processing + filename);
		console.log('ERROR processSkuInt - > ', error)
	}
}