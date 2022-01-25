function load() {
  if (process.platform !== 'linux') {
    return;
  }
  console.log('MPRIS is not really done yet...');
}

module.exports = {
  name: 'MPRIS',
  load,
};
