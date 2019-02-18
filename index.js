/*
*   R2G Warehouse REPL Demo
*   Eric Turner (turner.eric.g@gmail.com)
*/

const repl = require('repl'); // Node native module for making a READ-EVAL-PRINT loop
const command = require('./commands/command'); // Custom command handler
const logger = require('./logging/logger'); // Custom logging module
const store = require('./data/JSONstore'); // Simple model for non-persistant data store

// Display the title and help text upon loading module
const title = 'Rooms To Go warehouse REPL demo';
const helpLine = '\nFor a list of commands, type "help"';
const quitLine = '\nTo quit, type "exit"';
console.log(title, helpLine, quitLine);

// Main function to evaluate user input
const eval = ((cmd, context, filename, cb) => {
    const result = command(cmd, store); // Pass the command and data instance to the handler and get result
    console.log(result); // Display result to user
    logger(cmd, result); // Log command and result
    cb(null); // Callback to return to the prompt
});

// Start the custom REPL, pass the entry function
const r2gREPL = repl.start({
    prompt:  '> ',
    eval: eval
});