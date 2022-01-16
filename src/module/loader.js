/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

function listModules() {
  const modules = [];
  fs.readdirSync('./src/module/modules').forEach((file) => {
    if (!file.endsWith('.js')) {
      return;
    }
    const module = require(`./modules/${file}`);
    modules.push(module);
  });
  return modules;
}

module.exports = {
  listModules,
};
