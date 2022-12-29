const cssModule = require('./modules/css');
const discordModule = require('./modules/discord');
const mprisModule = require('./modules/mpris');
const trayModule = require('./modules/tray');

function listModules() {
  return [cssModule, discordModule, mprisModule, trayModule];
}

module.exports = {
  listModules,
};
