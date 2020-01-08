import chalk from 'chalk';

/**
 * @name log
 * @type {{success: (function(*=)), info: (function(*=)), gray: (function(*=)), error: (function(*=))}}
 */
const log = {
    success(msg) {  console.log(chalk.greenBright(msg)); },
    info(msg) { console.log(chalk.blueBright(msg)); },
    gray(msg) { console.log(chalk.gray(msg)); },
    error(msg) { console.log(chalk.redBright(msg)); }
};

export default log;