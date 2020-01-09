import {DatabaseField, DatabaseModel} from '../js/DatabaseModel';
import User from '../../shared/entities/User';

/**
 * @name UserModel
 * @extends DatabaseModel<User>
 */
class UserModel extends DatabaseModel {}

UserModel.config({
	table: 'user',
	entity: User,

	fields: [
		new DatabaseField({name: 'id', type: 'int', length: 11})
			.setAutoIncrement(true).setPrimaryKey(true),

		new DatabaseField({name: 'name', type: 'varchar', length: 256}).setDefault(''),
		new DatabaseField({name: 'email', type: 'varchar', length: 256}).setDefault(''),
		new DatabaseField({name: 'password', type: 'varchar', length: 64}).setDefault(''),
	],
});

export default UserModel;