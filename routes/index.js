/*global module, require */
module.exports = function (app) {

    'use strict';

    //Dashboard Page
    app.get('/dashboard', function (req, res) {

        //To view the static files created we need to do this in app.js: app.use(express.static(__dirname + '/public'));
        //Unfortunatly Phantomas automaticaly creates an index.html file which means / will automatically load that
        //So using / in routes does nothing
        var fs = require('fs');

        fs.stat('public/index.html', function(err, data) {
            res.render('dashboard', {
                 "last_modified" : data.mtime
                }
            );
        });
    });

    //Load Phantomas index.html Page created when Grunt is ran
    app.get('/chart', function (req, res) {

        var fs = require('fs');

        fs.readFile('public/index.html', 'utf-8', function(err, data) { 
            res.send(data);
        });
    });

    //Load page speed results created when Grunt is run
    app.get('/pagespeed', function (req, res) {

        var fs = require('fs');

        fs.readFile('public/pagespeed.html', 'utf-8', function(err, data) { 
            res.render('pagespeed', {
                 "page_speed_results" : data
                }
            );

        });
    });

    //Load JSON test results and populate template with results
    app.get('/yslow', function (req, res) {

        var fs = require('fs'),

                files = [ 'public/michaelkitzman.json',
                          'public/dunkfu.json',
                          'public/stormdestroyer.json',
                          'public/lastknownphoto.json'
                ],
                count           = 0,
                sites_array   = [],
                json_string,
                test_url,
                i;

            function decode_html_entities(str) {
                return String(str).replace(/http%3A%2F%2F/g, 'http://').replace(/%2F/g, '/').replace(/https%3A/g, 'https:');
            }

            //Get the yslow JSON results for each test, combine then output in Dust template
            for (i=0;i<files.length;i++) {

                fs.readFile(files[i], 'utf-8', function(err, data) { 

                    count++;

                    json_string = decode_html_entities(data);
                    json_string = JSON.parse(json_string);
                    test_url    = json_string.u;

                    sites_array.push(json_string);
                    
                    if (count === files.length) {
                        res.render('yslow', {
                             "sites" : sites_array
                            }
                        );
                    } 
                });
            }

    });


    //generic 404
    app.get("*", function(req, res) {
        res.render('notfound');
    });

};
