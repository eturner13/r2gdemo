const fs = require('fs');  // Node native file manipulation

const logFilePath = './logging/commandLog'; // Path to logfile
let cmds = [];

const logger = (cmd, result) => {

    // Add log line to temp log instance
    const logTime = new Date().toISOString();
    cmds.push(logTime + ' | ' + cmd + result + '\n\n');
    if (cmds.length === 2) { // Every 2 commands, log asynchronously
        fs.appendFile(logFilePath, cmds[0] + cmds[1], 'utf8', err => {if (err) {console.log(err)}}); // Append to the logfile
        cmds = []; // Reset command buffer
    }
}

module.exports = logger;