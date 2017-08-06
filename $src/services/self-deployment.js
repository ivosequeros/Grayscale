/* Config */
let config = require('../config.js');

/* Libraries */
var lib = {};
lib.gad = require('git-auto-deploy');
lib.express = require('express');
lib.app = lib.express();
lib.bodyParser = require('body-parser');

lib.app.use(lib.bodyParser.json());

module.exports = class SelfDeployment {
    static setup(death) {
        // test
        lib.app.get('/test', function(req, res) {
            res.send('ok');
        });
        // listen for webhook
        lib.app.post('/deployment', function(req, res) {
            res.send('ok');

            console.log('Self-Deploying...');
            // deploy
            lib.gad.deploy(undefined, undefined, death);
        });

        lib.app.listen(80, function() {
            console.log('Server ready');
        });
    }
};