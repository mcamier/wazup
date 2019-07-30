const env = process.env;

module.exports = {
  port: env.PORT || 4343,
  host: env.HOST || 'localhost',
  wsport: env.WSPORT || 4242,
};