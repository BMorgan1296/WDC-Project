var express = require('express');
var router = express.Router();

//User Object
var user = [];
user[0] = 
{
	email:"a1716836@student.adelaide.edu.au",
	password:"potato",
	localCurr:"AUD",
	currId:"NULL",
	bookings:[]
};
//Business Object
var business = [];
business[0] = 
{
	email:"lolol@business.com.au",
	password:"lol",	
	currId:"NULL",
	bookings:[],
	rating:0
};
var tempSession = [];

function validate(givenID, obj)
{
	for (var i = 0; i < obj.length; i++)
	{
		if(givenID == obj[i].currId) //searches for ID match
		{
			return i;
		}
	}

	return -1; //failure to find ID match, i.e. not logged in
}

//Hi Marker!
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.post('signup.json'), function
//router.post('login.json'), function

router.post('/currency.json', function(req)
{
	//user[0].currId = req.session.id;
	var index = validate(req.session.id, user);
	if(index !== -1)
	{
		var tempCurr = req.body.curr;
		user[index].localCurr = tempCurr.curr; //sets user's local currency
	}
	else //not logged in
	{
		index = validate(req.session.id, tempSession);
		console.log(index);
		if(index !== -1)
		{
			tempSession[index].currId = req.session.curr; //NOT WORKING
			tempSession[index].curr = req.body.curr;
		}
		else
		{
			var temp = {curr:req.body.curr, currId:req.session.id}; //makes new object
			tempSession.push(temp); //setting currID on the tempSession
		}
	}	
	//return search results with a different price?	
});

module.exports = router;
