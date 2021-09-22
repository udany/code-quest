import path from 'path';
import fs from 'fs';

function getSolutionPath(world, level) {
	return path.resolve(`./src/solutions/world-${world}/${world}-${level}/index.js`);
}

const solutionService = {
	read(world, level) {
		let filePath = getSolutionPath(world, level);

		let content = fs.readFileSync(filePath, 'utf8');

		return content;
	},

	write(world, level, content) {
		let filePath = getSolutionPath(world, level);

		fs.writeFileSync(filePath, content);
	}
};

export default solutionService;
