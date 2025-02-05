
import fs from 'fs';
import * as path from "path";
import { ISkuInt, ISkuIntXML } from "../interface/skuint";
import { getSkuDatalevel } from "./common";
import { saveCsv } from './csvUtilities';

const convertToCsv = (skuInputData) => {
	const jsonPath = path.join(__dirname, `../templates/skuitems.json`);
	const filedata = fs.readFileSync(jsonPath, 'utf-8');
	const skuTemplateJson = JSON.parse(filedata);
	const dataLevel2 = skuInputData.NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2;
	//let result = [{...Object.keys(skuTemplateJson)}];
	let result = [];
	const output = dataLevel2.map((d2, i) => {
		let tempData: any = {};
		for (let key in skuTemplateJson) {
			if (skuTemplateJson.hasOwnProperty(key)) {
			  if(skuTemplateJson[key].includes('[~]')) {
				const matchKeyArr = skuTemplateJson[key].replace('~', i);
				tempData[key] = getArrVal(matchKeyArr, skuInputData);
				//tempData[key] = skuTemplateJson[key].split('.').reduce((o, i) => o[i], skuInputData);
			  } else {
				tempData[key] = skuTemplateJson[key].split('.').reduce((o, i) => o[i], skuInputData);
			  }
			}
		}
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

export const processSkuInt = async (data: ISkuIntXML) => {
	const { NETLOGMESSAGE } = data;
	//const datalevel = await getSkuDatalevel(DATA?.DATALEVEL2?.DATA2);
	const output = convertToCsv(data);
	saveCsv('output.csv', output);
	console.log(output);
	
	// const response: ISkuInt = {
	// 	"messageid": NETLOGMESSAGE.MESSAGEID,
	// 	"messagetype": NETLOGMESSAGE.MESSAGETYPE,
	// 	"sourceid": NETLOGMESSAGE.SOURCEID,
	// 	"senttimestamp": NETLOGMESSAGE.SENTTIMESTAMP,
	// 	"clientid": NETLOGMESSAGE.CLIENTID,
	// 	"clientsession": NETLOGMESSAGE.CLIENTSESSION,		
	// 	"consignee": DATA.CONSIGNEE,
	// 	"sku": DATA.SKU,
	// 	"skudesc": DATA.SKUDESC,
	// 	"skushortdesc": DATA.SKUSHORTDESC,
	// 	"manufacturersku": DATA.MANUFACTURERSKU,
	// 	"vendorsku": DATA.VENDORSKU,
	// 	"othersku": DATA.OTHERSKU,
	// 	"skugroup": DATA.SKUGROUP,
	// 	"classname": DATA.CLASSNAME,
	// 	"status": DATA.STATUS,
	// 	"inventory": DATA.INVENTORY,
	// 	"newsku": DATA.NEWSKU,
	// 	"initialstatus": DATA.INITIALSTATUS,
	// 	"velocity": DATA.VELOCITY,
	// 	"onsitemin": DATA.ONSITEMIN,
	// 	"onsitemax": DATA.ONSITEMAX,
	// 	"lastcyclecount": DATA.LASTCYCLECOUNT,
	// 	"cyclecountint": DATA.CYCLECOUNTINT,
	// 	"lowlimitcount": DATA.LOWLIMITCOUNT,
	// 	"preflocation": DATA.PREFLOCATION,
	// 	"prefputregion": DATA.PREFPUTREGION,
	// 	"unitprice": DATA.UNITPRICE,
	// 	"picture": DATA.PICTURE,
	// 	"picksortorder": DATA.PICKSORTORDER,
	// 	"defaultuom": DATA.DEFAULTUOM,
	// 	"editdate": DATA.EDITDATE,
	// 	"edituser": DATA.EDITUSER,
	// 	"overpickpct": DATA.OVERPICKPCT,
	// 	"overreceivepct": DATA.OVERRECEIVEPCT,
	// 	"jobtype": DATA.JOBTYPE,
	// 	"rohoscompatiable": DATA.RoHoSCOMPATIABLE,
	// 	"hsc": DATA.HSC,
	// 	"countryoforigin": DATA.COUNTRYOFORIGIN,
	// 	"weight": DATA.WEIGHT,
	// 	"height": DATA.HEIGHT,
	// 	"depth": DATA.DEPTH,
	// 	"width": DATA.WIDTH,
	// 	"volume": DATA.VOLUME,
	// 	"flammable": DATA.FLAMMABLE,
	// 	"shelflife": DATA.SHELFLIFE,
	// 	"attribute2": DATA.ATTRIBUTE2,
	// 	"attribute3": DATA.ATTRIBUTE3,
	// 	"attribute4": DATA.ATTRIBUTE4,
	// 	"currency": DATA.CURRENCY,
	// 	"exported": DATA.EXPORTED,
	// 	"datalevel2": datalevel
	// };
	
	// return { response, datalevel };
}