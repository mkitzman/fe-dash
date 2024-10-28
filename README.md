#fe-dash
### Front End Performance Dashboard

!['Screenshot of gifreply'](http://i.imgur.com/a2DwvGd.png)

Run a set of grunt tasks ( yslow and phantomas and pagespeed ) to measure front end performance metrics. The returned metrics are then visualized and viewable in terminal directly or via a dashboard page running on express located at http://server:3000/dashboard


Set Up:
```
git clone git@github.com:mkitzman/fe-dash.git
cd fe-dash && npm install
```

Run perfomrance tests
```
grunt
```

Start App
```
node app.js
```
In browser got to http://localhost:3000/dashboard

Additionally you can run this as a chron job with a default setting of once a day.
```
node cron_jobs.js
```




