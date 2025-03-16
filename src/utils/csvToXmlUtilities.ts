import fs from 'fs';
import path from 'path';

import { parse } from "csv-parse/sync";
import { config } from '../../config';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { getXmlType } from './common';
import { getFileName } from './fileUtilities';
import { generateFileName } from "./common";

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

    let customerId = null;

    if (lineItems != null) {
      customerId = lineItems[0].cusno;
    }

    const templatePath = path.join(__dirname, `../${config.paths.templates}${type}.json`);
    const outputFilePath = path.join(`${config.paths.success}`, generateFileName(type, customerId, orderId));

    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

    const xmlJson = convertCsvToXml(templateData, lineItems);

    const builder = new XMLBuilder({
      format: true,
      arrayNodeName: config.xmlOptions.csvToXmlNodeName,
    });

    const xmlOutput = builder.build(xmlJson);

    const processedOutput = processXmlOutput(xmlOutput);

    fs.writeFileSync(outputFilePath, processedOutput, 'utf8');

    console.log(`Generated XML for order: ${orderId}`);
  });
};

function convertCsvToXml(jsonTemplate, data, loopKey = '') {
  return data.map(row => {
    let output = {};

    jsonTemplate.forEach(item => {
      const { tag, children, matchKey, defaultValue, type } = item;
      const tagName = matchKey || tag;

      if (tagName === 'HEADER') {
        if (children && children.length > 0) {
          const childOutput = convertCsvToXml(children, [row]);
          output = { ...output, ...childOutput[0] };
        }
        return;
      }

      if (!children || children.length === 0) {
        output[tagName] = row[matchKey] || row[tag] || defaultValue;
      } else {
        if (type === 'loop') {
          if (row[matchKey]) {
            output[tag] = row[matchKey]?.map(loopRow => convertCsvToXml(children, [loopRow])) || [];
          } else {
            output[tag] = convertCsvToXml(children, [row]);
          }
        } else {
          output[tagName] = convertCsvToXml(children, [row]);
        }
      }
    });

    return output;
  });
}


function processXmlOutput(xmlString) {

  const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });
  const jsonData = parser.parse(`<ROOT>${xmlString}</ROOT>`);

  const headers = Array.isArray(jsonData.ROOT.HEADER) ? jsonData.ROOT.HEADER : [jsonData.ROOT.HEADER];

  let staticData: any = {};
  let lineItems = [];

  headers.forEach((header, index) => {
    if (index === 0) {
      staticData = { ...header };
      delete staticData.LINE;
    }

    if (header.LINE) {
      if (Array.isArray(header.LINE)) {
        lineItems.push(...header.LINE);
      } else {
        lineItems.push(header.LINE);
      }
    }
  });

  const finalOutput = {
    HEADER: {
      ...staticData,
      LINE: lineItems.length > 1 ? lineItems : lineItems[0]
    }
  };

  const builder = new XMLBuilder({ format: true });
  return builder.build(finalOutput);
}