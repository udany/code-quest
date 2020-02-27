import express from 'express';
import SolutionModel from "../../models/SolutionModel";

import db from '../../Database';
import Solution from '../../../shared/entities/Solution';
import {DatabaseQueryCondition} from '../../js/DatabaseQueryComponent';

let router = express.Router({});

router.get('/:world-:level', async (req, res) => {
    if(!req.session.user){
        res.status(404).send('Usuário não está logado.');
        return;
    }

    let [solution] = await SolutionModel.select(db, [
        new DatabaseQueryCondition({
            column: 'world',
            values: [req.params.world]
        }),
        new DatabaseQueryCondition({
            column: 'level',
            values: [req.params.level]
        }),
        new DatabaseQueryCondition({
            column: 'userId',
            values: [req.session.user.id]
        })
    ]);

    res.send(solution ? solution.Serialize() : null);

});

router.get('/:world-:level/exists', async (req, res) => {
	if(!req.session.user){
		res.status(404).send('Usuário não está logado.');
		return;
	}

	let [solution] = await SolutionModel.select(db, [
		new DatabaseQueryCondition({
			column: 'world',
			values: [req.params.world]
		}),
		new DatabaseQueryCondition({
			column: 'level',
			values: [req.params.level]
		}),
		new DatabaseQueryCondition({
			column: 'userId',
			values: [req.session.user.id]
		})
	]);

	res.send({exists: !!solution, solution: solution});
});

router.post('/', async (req, res) => {
    if(!req.session.user){
        res.status(404).send('Usuário não está logado.');
        return;
    }

    const solution = new Solution(req.body);
    solution.userId = req.session.user.id;

    const [existingSolution] = await SolutionModel.select(db, [
        new DatabaseQueryCondition({
            column: 'world',
            values: [solution.world]
        }),
        new DatabaseQueryCondition({
            column: 'level',
            values: [solution.level]
        }),
        new DatabaseQueryCondition({
            column: 'userId',
            values: [solution.userId]
        })
    ]);

    if(existingSolution){
        solution.id = existingSolution.id;
    }

    await SolutionModel.save(db, solution, ['code', 'userId', 'completion', 'world', 'level']);

    res.send(solution ? solution.Serialize() : null);

});

export default {
    path: '/solution',
    router
}