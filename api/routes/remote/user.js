import express from 'express';
import UserModel from "../../models/UserModel";

import db from '../../Database';
import User from '../../../shared/entities/User';
import UserController from '../../controllers/remote/UserController';
import {DatabaseQueryCondition} from '../../js/DatabaseQueryComponent';

let router = express.Router({});

router.get('/me', async (req, res) => {
	let user = req.session.user ? new User(req.session.user) : null;

    res.send(user ? user.Serialize(true) : null);
});

router.post('/login', async (req, res) => {

	let users = await UserModel.select(db, [
		new DatabaseQueryCondition({
			column: 'email',
			values: [req.body.loginEmail]
		})
	]);

	if(users.length){
		let user = users[0];

		let passwordMatch = await UserController.comparePassword(req.body.loginPassword, user.password);

		if(passwordMatch){
			req.session.user = user;

			res.send({status: true});
			return;
		}
	}

	res.status(401).send({status: false});
});

router.post('/logout', async (req, res) => {
	if(!req.session.user){
		res.status(404).send('Usuário não está logado.');
		return;
	}

	req.session.user = null;

	res.status(200).send({status: true});
});

router.post('/register', async (req, res) => {
    const user = new User(req.body);

	let users = await UserModel.select(db, [
		new DatabaseQueryCondition({
			column: 'email',
			values: user.email
		})
	]);

	if (users.length) {
		res.status(409).send({error: 'duplicate_email'});
		return;
	}

    await UserController.register(user);

	req.session.user = user;

    res.send(user.Serialize(true));
});

export default {
	path: '/user',
	router
}
