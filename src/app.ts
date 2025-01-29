import express from 'express';
import cors from 'cors';
import chokidar from "chokidar";
import fs from 'fs';
import * as path from "path";
import { parseXmlFile } from './readXml';
import bodyParser, { json } from "body-parser";


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

app.get('/api/get-json', (req, res) => {
	try {
		const { type } = req.query;
		console.log("Type", type);

		const filePath = path.join(__dirname, 'templates/' + type + '.json');
		console.log("File Path", filePath);

		// Read the file synchronously
		const data = fs.readFileSync(filePath, 'utf8');

		// Parse the JSON data
		const jsonData = JSON.parse(data);
		res.json(jsonData);
		console.log('JSON Data:', jsonData);
	} catch (err) {
		console.error('Error reading or parsing the file:', err);
	}
});

// POST API to save JSON data into a file
app.post('/save-data', (req, res) => {
	console.log(req.body.type, '0000000');
	const jsonData = req.body.payload; // The incoming JSON data
	const type = req.body.type;

	const filePath = path.join(__dirname, 'templates/' + type + '.json');

	// Write the updated data to the file
	fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
		if (writeErr) {
			return res.status(500).json({ message: 'Error saving data', error: writeErr });
		}
		res.status(200).json({ message: 'Data updated successfully' });
	});
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
