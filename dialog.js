'use strict';

let inquirer = require('inquirer');
const question = {
    type: 'list',
    name: 'game',
    message: 'Welcome! Select the game, U want to play:',
    choices: ['puzzles', 'building']
};


function getSelectedGame() {
    return inquirer.prompt([question]);
}

module.exports = { getSelectedGame: getSelectedGame };