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
                url                  : 'http://michaelkitzman.com',
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
              urls: [ 
                'http://michaelkitzman.com',
                'http://dunkfu.com',
                'http://stormdestroyer.com',
                'http://lastknownphoto.com'
              ],
              reports: [
                'public/michaelkitzman.json',
                'public/dunkfu.json',
                'public/stormdestroyer.json',
                'public/lastknownphoto.json'
              ]
            },
            your_target: {
              files: []
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                url: "http://michaelkitzman.com"
            },
            prod: {
                options: {
                    url: "http://michaelkitzman.com",
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
