const inquirer = require('inquirer');

function decisionPromopt(inputMsg = null) {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'decision',
            message: inputMsg ? inputMsg : 'Are you sure want to continue?'
        }
    ])
}

function actionPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'Fetch listed companies',
                    value: 1,
                },
                {
                    name: 'Fetch company\'s share data',
                    value: 2
                }
            ]
        }
    ])
}

function symbolInputPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'symbol',
            message: 'Enter the symbol of the company:'
        }
    ])
}

module.exports = {
    decisionPromopt,
    actionPrompt,
    symbolInputPrompt
};
