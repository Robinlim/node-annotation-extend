/**
 * User: xin.lin
 * Date: 15-5-6
 * Qmonitor
 * Configure is as below:
 * "monitor": {
 * 		"server": "service name",
 *    "port": "service port",
 *    "prefix": "all metric prefix",
 *    "interval": send frequency
 * }
 */
'use strict';
/*@AutoLoad*/
var nodeAnnotation = require('node-annotation');

var Qmonitor = module.exports = nodeAnnotation.Annotation.extend({
    /**
     *
     * @return {[void]}
     */
    execute: function() {
        var model = this.model,
            po = model.po();
        model.exports().addMethodInterceptor(model.vo(), nodeAnnotation.PROXYCYCLE.BEFORE, function() {
            if (po) {
                Qmonitor.counter(po);
            }
        });
    }
}, {
    //annotation name
    name: 'Qmonitor',
    /*@Autowired("./StatsdClient")*/
    statsd: null,
    /**
     * every call will +1
     * @param  {[String]} indicator [indicator name]
     * @return {[void]}
     */
    counter: function(indicator) {
        Qmonitor.getClient().increment(indicator);
    },
    /**
     * fetch client
     * @return {[statsd]}
     */
    getClient: function() {
        return Qmonitor.statsd.getClient();
    }
});
