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
	bookings:[],
	personalInfo: 
	{
		gender:"m",
		first:"Brad",
		surname:"Morgan",
		postcode:"5097",
		city:"Adelaide",
		Country:"Australia"
	},
	paymentInfo:
	{
		card:"MasterCard",
		cardNo:"12345",
		expiryM:"07",
		expiryY:"2020"
	}	
};
//Business Object
var business = [];
business[0] = 
{
	email:"lolol@business.com.au",
	password:"lol",	
	currId:"NULL",
	bookings:[],
	address:"No",
	rating:0
};
var tempSession = [];

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
router.post('/login.json', function(req, res)
{
	var tempUser = req.body;
	for (var i = 0; i < user.length; i++) 
	{
		if(tempUser.email == user[i].email && tempUser.password == user[i].password)
		{
			user[i].currId = req.session.id; //setting currID
			res.redirect('mappage.html');
		}
		else
		{	
			res.redirect('index.html');
		}
	}
	
});

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

router.post('/populateBookings.json', function(req, res)
{
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		var toString = JSON.stringify(user[index].bookings);
		res.send(toString);
	}
	else
	{
		res.redirect('index.html');
	}
	
});

router.post('/viewBooking.json', function(req, res)
{
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		var bookingIndex = req.body.bookingIndex;
		var toString = JSON.stringify(user[index].bookings[bookingIndex]);
		res.sendD(toString);
	}
	else
	{
		res.redirect('index.html');
	}
	
});

router.post('/removeBookings.json', function(req, res)
{
	var bookingId = JSON.parse(req.body.removeId); //parses the removeId field from the given request
	var index = validate(req.session.id, user);	

	if(index !== -1)
	{
		delete user[index].bookings[bookingId]; //deletes the booking from the list
		res.send(); //should repopulate bookings as well
	}
	else
	{
		res.redirect('index.html');
	}
});

router.post('/UserInfo.json', function(req, res)
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var toString = user[index].personalInfo;
		res.send(toString);
	}
	else
	{
		res.redirect('index.html');
	}
});

router.post('/UpdateUserInfo.json', function(req, res)
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var info = req.body.info;
		user[index].personalInfo = info; //are the exact same object so copying over should be fine
		res.send();
	}
	else
	{
		res.redirect('index.html');
	}
});

router.post('/PaymentInfo.json', function(req, res)
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var toString = user[index].paymentInfo;
		res.send(toString);
	}
	else
	{
		res.redirect('index.html');
	}
});

router.post('/UpdatePaymentInfo.json', function(req, res)
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var info = req.body.info;
		user[index].paymentInfo = info; //are the exact same object so copying over should be fine
		res.send();
	}
	else
	{
		res.redirect('index.html');
	}
});

module.exports = router;
