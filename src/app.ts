import express from 'express';
import chokidar from "chokidar";
import { parseXmlFile } from './readXml';

const app = express();
// Set EJS as templating engine
app.set('view engine', 'ejs');
const port = 4001;

app.get('/', (req, res) => {
	res.render('home');
});

const path = `E:\\inbounce-outbounce`;
const watcher = chokidar.watch(path, {
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