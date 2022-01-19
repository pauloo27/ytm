function cors(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'https://music.youtube.com');
  next();
}

module.exports = {
  cors,
};
