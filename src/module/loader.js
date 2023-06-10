const cssModule = require('./modules/css');
const discordModule = require('./modules/discord');
const mprisModule = require('./modules/mpris');
const trayModule = require('./modules/tray');

const modulesList = [cssModule, discordModule, mprisModule, trayModule];

module.exports = {
  modulesList,
};
