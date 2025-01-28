
import fs from 'fs';
import * as path from "path";
import { InbountInt, InbountIntXML } from "../interface/inbountInt";
import { getInbountDatalevel } from "./common";

function convert(json, inbountdata, loopKey = '') {
    const output = {};
    json.forEach(item => {
        const { tag, children, matchKey, defaultValue, type } = item;
        if (!children || children.length === 0) {
			if(matchKey.includes('[~]')) {
                const matchKeyArr = matchKey.replace('~', loopKey);
                output[tag] = getArrVal(matchKeyArr, inbountdata);
            } else {
				output[tag] = matchKey ? getMatchingValue(item, inbountdata) : defaultValue;
			}
        } else {
            if(type == 'loop') {
                output[tag] = [];
                const loopVal = matchKey.split('.').reduce((o, i) => o[i], inbountdata);
                if(loopVal?.length > 1) {
                    loopVal.forEach((litem, i) => {
                        output[tag][i] = convert(children, inbountdata, i);
                    })
                }
            } else {
                output[tag] = convert(children, inbountdata, loopKey); // Recursively handle child elements
            }
        }
    });

    return output;
}


const getMatchingValue = (item, inbountdata) => {
	const regex = /[=,]/;
	const { secondaryMatchKey, matchKey, defaultValue } = item;
	let matchKeyVal = matchKey.split('.').reduce((o, i) => o[i], inbountdata);
	if(regex.test(defaultValue)){
		const commaSeparated = defaultValue.split(',');
		let matchVal = '';
		const result = commaSeparated.map(item => {
			const [key, value] = item.split('=');
			if(key?.toLowerCase() === matchKeyVal?.toLowerCase()) {
				matchVal = value
			}
			return { key, value };
		});
		return matchVal;
	} else if(secondaryMatchKey && !matchKeyVal) {
		matchKeyVal = secondaryMatchKey.split('.').reduce((o, i) => o[i], inbountdata);
	}

	return matchKeyVal
}

const getArrVal = (tag, inbountdata) => {
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
    }, inbountdata);
    return res;
}

export const processInbountInt = async (data: InbountIntXML) => {
	const { NETLOGMESSAGE, NETLOGMESSAGE: { MESSAGE : { HEADER : { DATA }}}  } = data;
	const datalevel = await getInbountDatalevel(DATA?.DATALEVEL2?.DATA2);
	const jsonPath = path.join(__dirname, '../templates/inbount.json');
	const inbountFiledata = fs.readFileSync(jsonPath, 'utf-8');
	const inbountdata = JSON.parse(inbountFiledata);
	const output = convert(inbountdata, data);
return output;
	const NAVXML: InbountInt = {
		"messageid": NETLOGMESSAGE.MESSAGEID,
		"messagetype": NETLOGMESSAGE.MESSAGETYPE,
		"sourceid": NETLOGMESSAGE.SOURCEID,
		"senttimestamp": NETLOGMESSAGE.SENTTIMESTAMP,
		"clientid": NETLOGMESSAGE.CLIENTID,
		"clientsession": NETLOGMESSAGE.CLIENTSESSION,		
		"consignee": DATA.CONSIGNEE,
		"orderid": DATA.ORDERID,
		"ordertype": DATA.ORDERTYPE,
		"referenceord": DATA.REFERENCEORD,
		"sourcecompany": DATA.SOURCECOMPANY,
		"companytype": DATA.COMPANYTYPE,
		"createdate": DATA.CREATEDATE,
		"notes": DATA.NOTES,
		"hostorderid": DATA.HOSTORDERID,
		"documenttype": DATA.DOCUMENTTYPE,
		"expecteddate": DATA.EXPECTEDDATE,
		"receivedfrom": DATA.RECEIVEDFROM,
		"warehouse": DATA.WAREHOUSE,
		"companyname": DATA.COMPANYNAME,
		"receiveawb": DATA.RECEIVEAWB,
		"street1": DATA.STREET1,
		"street2": DATA.STREET2,
		"city": DATA.CITY,
		"state": DATA.STATE,
		"zip": DATA.ZIP,
		"contact1name": DATA.CONTACT1NAME,
		"contact2name": DATA.CONTACT2NAME,
		"contact1phone": DATA.CONTACT1PHONE,
		"contact2phone": DATA.CONTACT2PHONE,
		"contact1fax": DATA.CONTACT1FAX,
		"contact2fax": DATA.CONTACT2FAX,
		"contact1email": DATA.CONTACT1EMAIL,
		"contact2email": DATA.CONTACT2EMAIL,
		"contacttype": DATA.CONTACTTYPE,
		"datalevel2": datalevel.length > 0 ? datalevel : []
	};
	
	return { NAVXML };
}

export const createInboutXML = (data) => {

}