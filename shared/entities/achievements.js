import Achievement from "./Achievement";

let achievements = [
    new Achievement({
        name: 'helloWorld();',
        description: 'Complete o primeiro nível',
        image: require('./assets/Terminal.svg')
    }),
    new Achievement({
        name: 'Home Office',
        description: 'Salve suas soluções para continuar em outro lugar.',
        image: require('./assets/Office.svg')
    }),
    new Achievement({
        name: 'Developer Mode',
        description: 'Obtenha privilégios de desenvolvedor.',
        image: require('./assets/Brackets.svg')
    })
];

export default achievements;