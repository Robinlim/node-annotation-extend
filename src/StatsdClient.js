/*@Component*/
var statsd = require('statsd-client');
var client;

module.exports = {
  /*@Configure('monitor')*/
  config: null,
  /**
   * fetch client
   * @return {[statsd]}
   */
  getClient: function() {
      if (!client) {
          var config = this.config;
          client = new statsd({
              host: config.server,
              port: config.port,
              prefix: config.prefix
          });
      }
      return client;
  }
};
