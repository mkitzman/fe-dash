var sites_config    = require('./configs/sites.js');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //See for full list of options: https://github.com/stefanjudis/grunt-phantomas
        phantomas: {
            michaelkitzman : {
              options : {
                additionalStylesheet : './css/phantomas_chart.css',
                assertions : {
                  'assetsWithQueryString' : 3,
                  'biggestLatency'        : 1400,
                  'bodyHTMLSize'          : 10500,
                  'commentsSize'          : 55,
                  'consoleMessages'       : 0,
                  'hiddenContentSize'     : 65,
                  'jsErrors'              : 0,
                  'gzipRequests'          : 8,
                  'medianResponse'        : 400,
                  'nodesWithInlineCSS'    : 0,
                  'requests'              : 30,
                  'timeToFirstImage'      : 1100,
                  'DOMelementsCount'      : 200,
                  'DOMqueries'            : 10
                },
                group     : {
                        'Overview' : [ 'timeToFirstByte', 'htmlSize', 'cssSize', 'httpsRequests', 'medianLatency', 'fastestResponse',  'jsSize', 'imageSize', 'imageCount', 'jsErrors', 'consoleMessages', 'ajaxRequests' ],
                        'Request Tests' : ['requests', 'notFound', 'domains', 'redirects', 'biggest response', 'biggestLatency', 'smallImages'],
                        'Timing Tests' : ['timeToLastByte', 'timeToFirstCss', 'timeToFirstJs', 'timeToFirstImage', 'slowestResponse','onDOMReadyTime','onDOMReadyTimeEnd', 'windowOnLoadTime', 'windowOnLoadTimeEnd', 'httpTrafficCompleted', 'timeBackend', 'timeFrontend'],
                        'Dom Tests' : ['DOMqueries','DOMqueriesById', 'DOMqueriesByClassName', 'DOMqueriesByTagName', 'DOMqueriesByQuerySelectorAll', 'DOMinserts', 'DOMqueriesDuplicated']
                },
                indexPath            : './public/',
                url                  : sites_config.phantomas,
                numberOfRuns         : 10,
                options   : {
                  'film-strip'   : false
                }
              }
            }
        },

        //See for full list of options: https://github.com/steveworkman/grunt-yslow-test
        yslow_test: {
            options: {
              info: "basic",
              format: "json",
              urls: sites_config.yslow_urls,
              reports: sites_config.yslow_reports
            },
            your_target: {
              files: []
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                url: sites_config.page_speed
            },
            prod: {
                options: {
                    url: sites_config.page_speed,
                    locale: "en_US",
                    strategy: "desktop",
                    threshold: 80
                }
            },
            paths: {
                options: {
                    paths: ["/"],
                    locale: "en_US",
                    strategy: "desktop",
                    threshold: 80
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phantomas');  
    grunt.loadNpmTasks('grunt-yslow-test');
    grunt.loadNpmTasks('grunt-pagespeed');

    // Default task(s).
    grunt.registerTask('default', ['phantomas', 'yslow_test' ]);

};
