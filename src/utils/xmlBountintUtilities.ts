
import fs from 'fs';
import * as path from "path";
import { config } from '../../config';

function convert(json, bountData, loopKey = 0) {
    const output = {};
    json.forEach(item => {
        const { tag, children, matchKey, defaultValue, type } = item;
        if (!children || children.length === 0) {
            if (matchKey.includes('[~]')) {
                const matchKeyArr = matchKey.replace('~', loopKey);
                output[tag] = getArrVal(matchKeyArr, bountData);
            } else {
                output[tag] = matchKey ? getMatchingValue(item, bountData) : defaultValue;
            }
        } else {
            if (type == 'loop') {
                output[tag] = [];
                const loopVal = matchKey.split('.').reduce((o, i) => o[i], bountData);                
                if (loopVal) {
                    const loopValArr = Array.isArray(loopVal) ? loopVal : [loopVal];
                    if(loopValArr?.length > 0) {
                        loopValArr.forEach((litem, i) => {
                            output[tag][i] = convert(children, bountData, i);
                        })
                    }
                }
            } else {
                output[tag] = convert(children, bountData, loopKey); // Recursively handle child elements
            }
        }
    });

    return output;
}


const getMatchingValue = (item, bountData) => {
    const regex = /[=,]/;
    const { secondaryMatchKey, matchKey, defaultValue } = item;
    let matchKeyVal = matchKey.split('.').reduce((o, i) => o[i], bountData);
    if (regex.test(defaultValue)) {
        const commaSeparated = defaultValue.split(',');
        let matchVal = '';
        const result = commaSeparated.map(item => {
            const [key, value] = item.split('=');
            if (key?.toLowerCase() === matchKeyVal?.toLowerCase()) {
                matchVal = value
            }
            return { key, value };
        });
        return matchVal;
    } else if (secondaryMatchKey && !matchKeyVal) {
        matchKeyVal = secondaryMatchKey.split('.').reduce((o, i) => o[i], bountData);
    }

    return matchKeyVal
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
            o = o?.[i];
        }

        return o;
    }, bountData);
    return res;
}

export const processXmlTemplate = async (type: string, xmlData: any) => {
    try {
        const jsonPath = path.join(__dirname, `../${config.paths.templates}${type}.json`);
        const filedata = fs.readFileSync(jsonPath, 'utf-8');
        const bountData = JSON.parse(filedata);
        const output = convert(bountData, xmlData);
        return output;
    } catch (error) {
        console.log(`ERROR ===> processXmlTemplate `, error, type)
    }
}