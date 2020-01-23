import bcrypt from 'bcryptjs';
import UserModel from '../../models/UserModel';
import db from '../../Database';

const UserController = {

	async register(obj) {
		if (obj.passwordRaw) {
			obj.password = await this.encryptPassword(obj);
			obj.passwordRaw = '';
		}

		return UserModel.save(db, obj, ['name', 'email', 'password']);
	},

	async encryptPassword(password) {
		return bcrypt.hash(password, 12);
	},

	async comparePassword(password, hash) {
		return bcrypt.compare(password, hash);
	}
};

export default UserController;