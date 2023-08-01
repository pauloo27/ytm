const express = require('express');
const { cors } = require('./cors');
const { route } = require('./route');
const { startWS, handleWSUpgrade } = require('./ws');

const serverPort = 4200;

function start() {
  const app = express();
  const wss = startWS();

  // allow requests from https://music.youtube.com
  app.use(cors);

  route(app);

  const server = app.listen(serverPort);
  handleWSUpgrade(server, wss);
  return { server, wss };
}

module.exports = {
  start,
};
