const { existsSync, writeFileSync, mkdirSync } = require('fs');
const { actionPrompt, decisionPromopt, symbolInputPrompt } = require('./prompts');
const { fetchList, fetchData } = require('./fetch');

async function fetchListedCompanies() {
    if (existsSync('./data/list.json')) {
        const { decision } = await decisionPromopt('Company list already exists, Do you want to fetch again?');
        if (decision) {
            const list = await fetchList();
            writeFileSync('./data/list.json', list);
            console.log('Successfully fetched and updated companies list!')
        } else {
            console.log('Aborted fetching companies list!')
        }
    } else {
        const list = await fetchList();
        writeFileSync('./data/list.json', list);
        console.log('Successfully fetched companies list!')
    }
}

async function fetchCompanyShareData() {
    const { symbol } = await symbolInputPrompt();
    const { json, text } = await fetchData(symbol);

    if (!existsSync('./data/companies')) mkdirSync('./data/companies');
    writeFileSync(`./data/companies/${symbol.toUpperCase()}.json`, json);
    writeFileSync(`./data/companies/${symbol.toUpperCase()}.csv`, text);
    
    console.log(`Successfully fetched ${symbol.toUpperCase()} company's share data!`)
}

async function main() {
    const { action } = await actionPrompt();

    if (action === 1) await fetchListedCompanies();
    else if (action === 2) await fetchCompanyShareData();  
}

main()
