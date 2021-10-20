import express from 'express'
import solutionService from '../services/solutionService.js';

let router = express.Router({});

router.get('/:world-:level', async function (req, res, next) {
	try {
		res.header('Content-Type', 'text/javascript');
		res.header('charset', 'UTF-8');
		res.send(solutionService.read(req.params.world, req.params.level));
	} catch (e) {
		console.log(e);
		res.send(500);
	}
});

router.post('/:world-:level', async function (req, res, next) {
	try {
		solutionService.write(req.params.world, req.params.level, req.body.content);

		res.send(200);
	} catch (e) {
		console.log(e);
		res.send(500);
	}
});

export default {
	path: '/solution',
	router
}
