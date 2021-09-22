import axios from 'axios';

const options = {
	baseURL: '/api/'
};

const client = axios.create(options);

const api = {
	solution: {
		async read(world, level) {
			let { data } = await client.get(`/solution/${world}-${level}`);

			return data;
		},

		async write(world, level, content) {
			await client.post(`/solution/${world}-${level}`, {
				content
			});
		},
	}
};

export default api;
