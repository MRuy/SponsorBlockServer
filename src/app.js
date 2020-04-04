var express = require('express');
// Create a service (the app object is just a callback).
var app = express();
var config = require('./config.js');

// Middleware 
var corsMiddleware = require('./middleware/cors.js');
var loggerMiddleware = require('./middleware/logger.js');

// Routes
var getVideoSponsorTimes = require('./routes/getVideoSponsorTimes.js');
var submitSponsorTimes = require('./routes/submitSponsorTimes.js');
var voteOnSponsorTime = require('./routes/voteOnSponsorTime.js');
var viewedVideoSponsorTime = require('./routes/viewedVideoSponsorTime.js');
var setUsername = require('./routes/setUsername.js');
var getUsername = require('./routes/getUsername.js');
var shadowBanUser = require('./routes/shadowBanUser.js');
var addUserAsVIP = require('./routes/addUserAsVIP.js');
var getSavedTimeForUser = require('./routes/getSavedTimeForUser.js');
var getViewsForUser = require('./routes/getViewsForUser.js');
var getTopUsers = require('./routes/getTopUsers.js');
var getTotalStats = require('./routes/getTotalStats.js');
var getDaysSavedFormatted = require('./routes/getDaysSavedFormatted.js');


//setup CORS correctly
app.use(corsMiddleware);
app.use(loggerMiddleware);

//add the get function
app.get('/api/getVideoSponsorTimes', getVideoSponsorTimes);

//add the post function
app.get('/api/postVideoSponsorTimes', submitSponsorTimes);
app.post('/api/postVideoSponsorTimes', submitSponsorTimes);

//voting endpoint
app.get('/api/voteOnSponsorTime', voteOnSponsorTime);
app.post('/api/voteOnSponsorTime', voteOnSponsorTime);

//Endpoint when a sponsorTime is used up
app.get('/api/viewedVideoSponsorTime', viewedVideoSponsorTime);
app.post('/api/viewedVideoSponsorTime', viewedVideoSponsorTime);

//To set your username for the stats view
app.post('/api/setUsername', setUsername);

//get what username this user has
app.get('/api/getUsername', getUsername);

//Endpoint used to hide a certain user's data
app.post('/api/shadowBanUser', shadowBanUser);

//Endpoint used to make a user a VIP user with special privileges
app.post('/api/addUserAsVIP', addUserAsVIP);

//Gets all the views added up for one userID
//Useful to see how much one user has contributed
app.get('/api/getViewsForUser', getViewsForUser);

//Gets all the saved time added up (views * sponsor length) for one userID
//Useful to see how much one user has contributed
//In minutes
app.get('/api/getSavedTimeForUser', getSavedTimeForUser);

app.get('/api/getTopUsers', getTopUsers);

//send out totals
//send the total submissions, total views and total minutes saved
app.get('/api/getTotalStats', getTotalStats);

//send out a formatted time saved total
app.get('/api/getdayssavedformatted', getDaysSavedFormatted);

app.get('/database.db', function (req, res) {
    res.sendfile("./databases/sponsortimes.db", { root: __dirname });
});

// Create an HTTP service.
module.exports = function createServer (callback) {
    return app.listen(config.port, callback);
}