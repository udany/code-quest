import express from 'express'
import path from 'path'
import fs from 'fs'

let router = express.Router({});

router.get('/', async function (req, res) {
	res.send("Hello world");
});

router.get('/Solution/*', (req, res) => {
	let solution = req.params[0];
	let filePath = path.join(__dirname, '../../..', 'solutions', solution+'.js');
	let fileContent = fs.readFileSync(filePath);
	res.send(fileContent);
});

router.post('/Solution/*', (req, res) => {
	let solution = req.params[0];
	let filePath = path.join(__dirname, '../../..', 'solutions', solution+'.js');
	fs.writeFileSync(filePath, req.body.content);
	res.status(200).send();
});

export default {
	path: '/',
	router
}