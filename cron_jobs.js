var CronJob = require('cron').CronJob;

///////////////////////////////////////////////////
// Run grunt task to update performance metrics
// Run Mon-Fri at 11pm
///////////////////////////////////////////////////
//new CronJob('0 23 * * 1-5', function() {
new CronJob('*/2 * * * *', function() {    
    var date        = new Date(),
        now         = date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes(),
        exec        = require('child_process').exec;

    console.log("grunt running: " + now);

    exec("grunt", function(error, stdout, stderr){
        console.log('Grunt Done');
    }); 

    exec("grunt pagespeed > ./public/pagespeed.html", function(error, stdout, stderr){
        console.log('Grunt pagespeed Done');
    }); 

   

}, null, true, "America/Los_Angeles");
