const commandList = require('./commandList'); // Possible commands for user
const add = require('./add');
const list = require('./list');
const stock = require('./stock');
const unstock = require('./unstock');

const commandHandler = (cmd, store) => {
    cmd = cmd.toString().toUpperCase().slice(0, -1); // Convert any input into upper case string, remove \n
    let result = '';
    if (cmd === 'HELP') { // Display list of commands
        commandList.forEach(c => { result = result + '\n' + c.command + ' ' + c.signature + ' - ' + c.desc });
    }
    else if (cmd === 'EXIT' || cmd === 'QUIT' || cmd === 'EOF') { // Quit REPL application
        process.exit();
    } else { // Validate then execute command
        cmd = cmd.split(' ') // Look at first word of command to determine path
        switch (cmd[0]) {
            case 'ADD':
                result = add(cmd, store);
                break;
            case 'LIST':
                result = list(cmd, store);
                break;
            case 'STOCK':
                result = stock(cmd, store);
                break;
            case 'UNSTOCK':
                result = unstock(cmd, store);
                break;
            default:  // Undefined command
                result = 'Error: Command "' + cmd[0] + '" not found! Type "help" for a list of commands';
        }
    };
    return result;
};

module.exports = commandHandler;