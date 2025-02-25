import fs from 'fs';
import path from 'path';

import { parse } from "csv-parse/sync";
import { config } from '../../config';
import { XMLBuilder } from 'fast-xml-parser';
import { getXmlType } from './common';

export const processCsv = async (filePath) => {
  try {
    let fileName = `${filePath.split("/")[1]}`;
    fileName = fileName.split(".")[0];

    const xmlType = getXmlType(fileName);

    const data = fs.readFileSync(filePath, 'utf8');

    const records = parse(data, {
      columns: true,
      trim: true,
      skip_empty_lines: true,
      relax_column_count: true
    });

    processCsvToXml(xmlType, records);

  } catch (error) {
    console.error("Error processing CSV:", error);
  }
};

export const processCsvToXml = (type, jsonData) => {
  const templatePath = path.join(__dirname, `../${config.paths.templates}${type}.json`);
  const outputFilePath = path.join(`${config.paths.success}`, `/${type}.xml`);

  try {
    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    const xmlJson = convertCsvToXml(templateData, jsonData);

    const builder = new XMLBuilder({
      arrayNodeName: "_DOC",
      format: true
    });

    const xmlOutput = builder.build(xmlJson);

    fs.writeFileSync(outputFilePath, xmlOutput, 'utf8');
    console.log("XML file successfully saved to", outputFilePath);

    return xmlOutput;
  } catch (error) {
    console.error("Error processing XML:", error);
  }
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