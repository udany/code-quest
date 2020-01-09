import express from 'express';
import UserModel from "../models/UserModel";

import db from '../Database';
import User from '../../shared/entities/User';
import UserController from '../controllers/UserController';

let router = express.Router({});

router.get('/', async function (req, res, next) {
    let data = await UserModel.select(db);

    res.send(data);
});

router.post('/register', async function (req, res, next) {
    const obj = new User(req.body);

    await UserController.register(obj);

    res.send(obj);
});

export default {
	path: '/user',
	router
}
