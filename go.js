const fetch = require('node-fetch');
const formatJson = require('json-format');
const { writeFileSync } = require('fs');

async function fetchData() {
    const data = await fetch('https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/V2_GAME_MASTER.json')
        .then(res => res.json());
    writeFileSync('./pokemon-go.json', formatJson(data, { type: 'space', size: 2 }));
}

fetchData();
