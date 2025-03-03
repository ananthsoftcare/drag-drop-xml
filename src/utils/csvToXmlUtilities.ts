import fs from 'fs';
import path from 'path';

import { parse } from "csv-parse/sync";
import { config } from '../../config';
import { XMLBuilder } from 'fast-xml-parser';
import { getXmlType } from './common';
import { getFileName } from './fileUtilities';

export const processCsv = async (filePath: string) => {
  try {
    let fileName = getFileName(filePath)?.split(".")[0];

    let groupedOrders = {};
    const xmlType = getXmlType(fileName);
    const data = fs.readFileSync(`${process.cwd()}${filePath}`, { encoding: 'utf8' });

    const records = parse(data, {
      columns: true,
      trim: true,
      skip_empty_lines: true,
      relax_column_count: true
    });

    // Group rows by orderno
    groupedOrders = records.reduce((orders: any, row: any) => {
      const orderId = row.orderno;
      if (!orders[orderId]) orders[orderId] = [];
      orders[orderId].push(row);
      return orders;
    }, {});

    processCsvToXml(xmlType, groupedOrders);

  } catch (error) {
    console.error("Error processing CSV:", error);
  }
};

export const processCsvToXml = (type: any, groupedOrders: any) => {
  Object.entries(groupedOrders).forEach(([orderId, lineItems]) => {

    const templatePath = path.join(__dirname, `../${config.paths.templates}${type}.json`);
    const outputFilePath = path.join(`${config.paths.success}`, `order-${orderId}.xml`);

    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

    const xmlJson = convertCsvToXml(templateData, lineItems);

    const builder = new XMLBuilder({
      format: true,
      arrayNodeName: config.xmlOptions.arrayNodeName
    });

    const xmlOutput = builder.build(xmlJson);
    fs.writeFileSync(outputFilePath, xmlOutput, 'utf8');

    console.log(`Generated XML for order: ${orderId}`);
  });
};

function convertCsvToXml(jsonTemplate, data, loopKey = '') {
  return data.map(row => {
    const output = {};

    jsonTemplate.forEach(item => {
      const { tag, children, matchKey, defaultValue, type } = item;
      const tagName = matchKey;

      if (!children || children.length === 0) {
        output[tagName] = row[matchKey] || defaultValue;
      } else {
        if (type === 'loop') {
          output[tagName] = row[matchKey]?.map(loopRow => convertCsvToXml(children, [loopRow])) || [];
        } else {
          output[tagName] = convertCsvToXml(children, [row]);
        }
      }
    });

    return output;
  });
}

