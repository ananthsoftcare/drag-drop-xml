import express from 'express';
import cors from 'cors';
import chokidar from "chokidar";
import fs from 'fs';
import * as path from "path";
import { parseXmlFile } from './readXml';
import bodyParser from "body-parser";
import { getXmlType } from './utils/common';
import { processXml } from './utils/xmlUtilities';

const app = express();
app.use(bodyParser.json());
const port = 4001;

// CORS options for specific origin (e.g., React app at localhost:3001)
const corsOptions = {
	origin: 'http://localhost:3000', // Allow only requests from this domain (React app)
	methods: ['GET', 'POST'],        // Allow only GET and POST methods
	allowedHeaders: ['Content-Type'], // Allow only Content-Type header
};

// Apply CORS globally for all routes with the given options
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/api/get-json', (req: any, res) => {
	try {
		const { query: { type } } = req;
		const filetype = getXmlType(type);
		const filePath = path.join(__dirname, `templates/${filetype}.json`);
		// Read the file synchronously
		const data = fs.readFileSync(filePath, 'utf8');
		// Parse the JSON data
		const jsonData = JSON.parse(data);
		res.json(jsonData);
	} catch (err) {
		console.error('Error reading or parsing the file:', err);
	}
});

// POST API to save JSON data into a file
app.post('/save-data', (req, res) => {
	const jsonData = req.body.payload; // The incoming JSON data

	const filetype = getXmlType(req.body.type);
	const filePath = path.join(__dirname, `templates/${filetype}.json`);

	// Write the updated data to the file
	fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
		if (writeErr) {
			return res.status(500).json({ message: 'Error saving data', error: writeErr });
		}
		res.status(200).json({ message: 'Data updated successfully' });
	});
});

app.post('/upload-file', async (req, res) => {
	const { fileName, fileData } = req.body;

	if (!fileData) {
		return res.status(400).send({ message: 'No file data provided' });
	}

	try {
		const base64Data = fileData.split(',')[1];
		const buffer = Buffer.from(base64Data, 'base64');

		const xmlData = buffer.toString('utf-8');
		let filePath = '/uploads/' + fileName.split('.')[0] + '.xml';

		fs.writeFile(`${process.cwd()}${filePath}`, xmlData, async (err) => {
			if (err) {
				res.status(500).send({ message: 'Unable to upload file and generate preview', error: err });
			} else {
				const jsonData = await processXml(`${filePath}`);

				console.log("XML Preview Data", jsonData);
				res.status(200).json({ message: 'Uploaded file and xml preview generated successfully', data: jsonData });
			}
		});

	} catch (error) {
		console.error('Error processing the file:', error);
		res.status(500).send({ message: 'Error processing the file', error: error.message });
	}
});


const source_path = `E:\\inbounce-outbounce`;
const watcher = chokidar.watch(source_path, {
	ignored: /(^|[\\/\\])\../, // ignore dotfiles
	persistent: true,
	ignoreInitial: true
});

watcher
	.on('add', path => parseXmlFile(path))
	.on('change', path => console.log(`File ${path} has been changed`))
	.on('unlink', path => console.log(`File ${path} has been removed`))
	.on('error', error => console.log(`Watcher error: ${error}`));

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
