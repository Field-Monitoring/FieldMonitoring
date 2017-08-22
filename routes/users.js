var express = require('express');
var passport = require('passport');
var geocoder = require('geocoder');
require('../controllers/loginController')(passport);
var router = express.Router();
var Job = require('../models/job');

router.post('/login', passport.authenticate('local-login'), 
    function(req, res){
        if (req.user) { 
        	res.json({"message":"success","position":req.user.position}); }
        else { res.send(401); }
    });

router.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/success', // redirect to the secure profile section
		failureRedirect : '/failure', // redirect back to the signup page if there is an error
}));



router.post('/postjob',function(req, res, next){
	var address = req.body.address;
	delete req.body.address;
	geocoder.geocode(address, function ( err, data ) {
		var lat = parseFloat(data.results[0].geometry.location.lat);
		var lng = parseFloat(data.results[0].geometry.location.lng);
		req.body.latitude = lat;
		req.body.longitude = lng;
  		Job.create(req.body,function(err, job){
		if(err) throw err;
		res.json({"message":"success", "latitude" : lat+"", "longitude" : lng+"" ,"address":address,"salary":job.salary});
	});
	});
});
router.get('/getalljobs',function(req, res, next){
	Job.find({}).exec(function (err, job) {
		res.json(job);
	})
});
router.get('/removealljobs',function(req, res, next){
	Job.remove({}).exec(function (err) {
		if(err) throw err;
		res.json({"success":"deleted all jobs"});
	})
});
router.get('/getbylocation/:lat/:lon',function(req, res, next){
	var lat = parseFloat(req.params.lat);
	var lon = parseFloat(req.params.lon);
	Job.find({$and:[{latitude: {$near:lat, $maxDistance: 10}},{latitude: {$near:lat, $maxDistance: 10}}]}, function(err, result){
    	res.json(result);
    });
}); 

// router.post('/',function (req, res, next) {
// 	res.json({"message":"ok"});
// });
	
	

 

module.exports = router;

                        
