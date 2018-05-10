var express = require('express');
var router = express.Router();

//User Object
var user = [];
user[0] = 
{
	email:"a1716836@student.adelaide.edu.au",
	password:"potato",
	localCurr:"NULL",
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
var tempSession = []; //can have 100 variable connections, otherwise could potentially get too many

function validate(givenID, obj)
{
	for (var i = 0; i < obj.length; i++)
	{
		if(givenID == obj[i].currId) //searches for ID match
			return i;
	}

	return -1; //failure to find ID match, i.e. not logged in
}

//Hi Marker!
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.post('signup.json'), function
//router.post('login.json'), function //also should send the local currency

router.post('/currency.json', function(req, res)
{
	var givenCurr = req.body.curr;
	var index = validate(req.session.id, user); //validates user to check for session

	if(index !== -1) //if user found
		user[index].localCurr = givenCurr;

	else //not logged in, checks to see if valid tempSession, and if not, creates a new one
	{
		index = validate(req.session.id, tempSession);
		if(index !== -1) //found temp session
		{
			if(givenCurr !== tempSession[index].localCurr)
			{
				tempSession[index].localCurr = givenCurr; //sets tempsession to the given curr
				res.send(JSON.stringify(tempSession[index].localCurr)); //sends it back				
			}
		}
		else
		{
			var newSession = {currId:req.session.id, localCurr:"NULL"};
			tempSession.push(newSession);
			res.send();
		}
	}	
	//return search results with a different price?	
});

module.exports = router;
