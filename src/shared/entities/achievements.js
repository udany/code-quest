import Achievement from "./Achievement";
import terminalSvg from './assets/Terminal.svg';
import officeSvg from './assets/Office.svg';
import bracketsSvg from './assets/Brackets.svg';

let achievements = [
    new Achievement({
        name: 'helloWorld();',
        description: 'Complete o primeiro nível',
        image: terminalSvg
    }),
    new Achievement({
        name: 'Home Office',
        description: 'Salve suas soluções para continuar em outro lugar.',
        image: officeSvg
    }),
    new Achievement({
        name: 'Developer Mode',
        description: 'Obtenha privilégios de desenvolvedor.',
        image: bracketsSvg
    })
];

export default achievements;