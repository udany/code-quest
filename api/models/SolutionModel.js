import {DatabaseField, DatabaseModel} from '../js/DatabaseModel';
import Solution from '../../shared/entities/Solution';

/**
 * @name SolutionModel
 * @extends DatabaseModel<Solution>
 */
class SolutionModel extends DatabaseModel {}

SolutionModel.config({
    table: 'solution',
    entity: Solution,

    fields: [
        new DatabaseField({name: 'id', type: 'int', length: 11})
            .setAutoIncrement(true).setPrimaryKey(true),

        new DatabaseField({name: 'code', type: 'text'}).setDefault(''),
        new DatabaseField({name: 'userId', type: 'int', length: 11}),
        new DatabaseField({name: 'completion', type: 'double'}),
        new DatabaseField({name: 'world', type: 'int', length: 11}),
        new DatabaseField({name: 'level', type: 'int', length: 11})
    ],
});

export default SolutionModel;