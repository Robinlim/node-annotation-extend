/**
 * @Author: xin.lin
 * @Date: 15-12-24
 * monitor to statistic request to response time
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
     * @return {[type]} [description]
     */
    execute: function() {
        var model = this.model,
            po = model.po(),
            voParam = model.voParam(),
            resIndex;
        voParam.some(function(item, i) {
            if (item == 'res' || item == 'response') {
                resIndex = i;
                return true;
            }
        });
        model.exports().addMethodInterceptor(model.vo(), nodeAnnotation.PROXYCYCLE.BEFORE, function() {
            if (po && typeof resIndex !== 'undefined') {
                var res = arguments[resIndex],
                    old = res.end,
                    current = new Date();
                res.end = function() {
                    Qmonitor.timing(po, Date.now() - current);
                    old.apply(res, arguments);
                };
            }
        });
    }
}, {
    //annotation name
    name: 'QmonitorRRT',
    /*@Autowired("./StatsdClient")*/
    statsd: null,
    /**
     * how much time spend this time
     * @param  {[String]} indicator [indicator name]
     * @param  {[Integer]} value
     * @return {[void]}
     */
    timing: function(indicator, value) {
        Qmonitor.getClient().timing(indicator, value);
    },
    /**
     * fetch client
     * @return {[statsd]}
     */
    getClient: function() {
        return Qmonitor.statsd.getClient();
    }
});
