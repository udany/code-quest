import api from './api';
import User from '../../../shared/entities/User';

const session = {
	user: null,
	async load() {
		let { data } = await api.get('/user/me');

		if (data && data.id) {
			this.user = new User(data);
		}
	}
};

export default session;