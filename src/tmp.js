module.exports = cb => ({
  lol: () => setInterval(cb.cb, cb.ms)
});
