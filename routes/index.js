var express = require('express');
var router = express.Router();
var CLIENT_ID = '314455925120-3eqrg8kqg9u39qup8ctkoo7ur7hfv44v.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);
var gticket;

//User Object
var user = [];
user[0] = 
{
	email:"a1716836@student.adelaide.edu.au",
	password:"potato",
	localCurr:"NULL",
	currId:"NULL",
	bookings:
	[
		{
		    "title":"this is the title",
			"numPeople":1,
			"price":"$400",
            "details":"none"
		},
		{
			"title":"title two",
			"numPeople":3,
			"price":"$1200",
            "details":"none"
		}
	],
	personalInfo: 
	{
		gender:"m",
		fName:"Brad",
		sName:"Morgan",
		address:"I live here",
		postcode:"5098",
		city:"Adelaide",
		country:"Australia"
	},
	paymentInfo:
	{
		cardType:"MasterCard",
		cardNo:"12345",
		cardCVV:"354",
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
	rooms:[],
	rating:0,
	numRatings:0,
	details:
	{
		name:"Crap",
		contact:"0422470946",
		address:"No address 4 u",
		suburb:"jokes",
		postcode:"5096",
		city:"Atlantis",
		country:"Moon"
	},
	amenities:[false, false, false, false, false, false] //pool, spa, wifi, fitness, parking, restaurant
};

var tempSession = {};

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

router.post('/login.json', function(req, res)
{
	var login = null;
    //user ID sent, check if matches.
    //if matches, login
    //if no match, refuse login
    // If login details present, attempt login 
    if(req.body.idtoken !== undefined) //undefined when no googleID token provided
    {
		console.log("Google Token Received");

		async function verify()
		{
			const ticket = await client.verifyIdToken({ //verifies token
				idToken: req.body.idtoken, //openID stuff from google
				audience: CLIENT_ID
			});

			const payload = ticket.getPayload();
			const userid = payload['sub'];

			console.log(userid);

			//QUERY FOR USER IN DATABASE USING USERID SEND 1
			//IF NOT FOUND, SEND -1 AND HANDLE THAT ON FRONT END
            res.send("1"); //temp, should be sending Fname back
		}

		verify().catch(console.error);
	}
	else //idtoken not found, send -1 as error
	{
		console.log(req.body.idtoken);
		res.send("-1");
	}

});

router.post('/signup.json', function(req, res) //will work by sending userID from google, and the other info from the signup part.
{
	
});

router.post('/businessLogin.json', function(req, res) {
    var businessLogin = null;
	console.log(JSON.stringify(req.body));
    var businessUser = req.body;

   if(businessUser.email !== undefined && businessUser.password !== undefined){
       console.log("Username + Password received");
	for (var i = 0; i < business.length; i++) 
	{
		if(businessUser.email === business[i].email && businessUser.password === business[i].password)
		{
            console.log("user found");
			business[i].currId = req.session.id; //setting currID. 
			tempSession[req.session.id] = req.body.email;
            businessLogin = businessUSer.email
            }
        }
		        res.json({email:businessLogin}); 
   }
   verify().catch(console.error);
});


router.post('/logout',function(req, res){
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		user[index].currId = "";
        req.session.destroy();
	}

	res.send(); //should logout user
});

router.post('/logoutBusiness',function(req){
	var index = validate(req.session.id, business); //finds valid user
	if(index !== -1)
	{
		business[index].currId = "";
	} //logs out the business?
});



router.post('/updateEmailUser.json', function(req, res) //should be called when user enters new email and presses done
{
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		var newEmail = JSON.parse(req.body.email);
		user[index].email = newEmail;
	}
	else
	{
		res.send("-1");
	}	
});

router.post('/updatePasswordUser.json', function(req, res) //may not be needed depending on openID
{
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		var newPW = JSON.parse(req.body.password);
		user[index].passwords = newPW;
	}
	else
	{
		res.send("-1");
	}	
});

router.post('/updateEmailBusiness.json', function(req, res) //should be called when business enters new email and presses done
{
	var index = validate(req.session.id, business); //finds valid business
	if(index !== -1)
	{
		var newEmail = JSON.parse(req.body.email);
		business[index].email = newEmail;
	}
	else
	{
		res.send("-1");
	}	
});

router.post('/updatePasswordBusiness.json', function(req, res) //may not be needed depending on openID
{
	var index = validate(req.session.id, business); //finds valid business
	if(index !== -1)
	{
		var newPW = JSON.parse(req.body.password);
		business[index].passwords = newPW;
	}
	else
	{
		res.send("-1");
	}
	
});//********************************************************************************************

router.post('/currency.json', function(req, res) //handles the changing of local currency
{
	var givenCurr = req.body.curr;
	var index = validate(req.session.id, user); //validates user to check for session

	if(index !== -1) //if user found
	{
		user[index].localCurr = givenCurr;
		res.send();
	}

	else //not logged in
	{
		res.send(); 
	}	
});

router.post('/newUserBooking.json', function(req, res) //pressing [x] on view manage bookings
{
	var newBooking = JSON.parse(req.body.newBooking);
	var index = validate(req.session.id, user);	

	if(index !== -1)
	{
		user[index].bookings.push(newBooking); //deletes the booking from the list
		res.send(); //should repopulate bookings as well
	}
	else
	{
		res.send("-1");
	}
});

router.get('/populateBookings.json', function(req, res) //should be called when user enters view manage bookings
{
	var index = validate(req.session.id, user); //finds valid user
	if(index !== -1)
	{
		var toString = JSON.stringify(user[index].bookings);
		res.send(toString);
	}
	else
	{
		res.send("-1");
	}	
});

router.post('/removeBookings.json', function(req, res) //pressing [x] on view manage bookings
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
		res.send("-1");
	}
});

router.get('/UserInfo.json', function(req, res) //gives user info
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var toString = user[index].personalInfo;
		res.send(toString);
	}
	else
	{
		res.send("-1");
	}
});

router.post('/UpdateUserInfo.json', function(req, res) //updates it when done button pressed
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var info = JSON.parse(req.body.info);
		user[index].personalInfo = info; //are the exact same object so copying over should be fine
		res.send();
	}
	else
	{
		res.send("-1");
	}
});

router.get('/PaymentInfo.json', function(req, res) //gives payment info
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var toString = user[index].paymentInfo;
		res.send(toString);
	}
	else
	{
		res.send("-1");
	}
});

router.post('/UpdatePaymentInfo.json', function(req, res) //updates payment info when done is clicked
{
	var index = validate(req.session.id, user);	
	if(index !== -1)
	{
		var info = JSON.parse(req.body.info);
		user[index].paymentInfo = info; //are the exact same object so copying over should be fine
		res.send();
	}
	else
	{
		res.send("-1");
	}
});
router.post('/BusinessInfo.json', function(req, res) //gives business info

{
	var index = validate(req.session.id, business);	
	if(index !== -1)
	{
		var toString = business[index].details;
		res.send(toString);
	}
	else
	{
		res.send("-1");
	}
});

router.post('/UpdateBusinessInfo.json', function(req, res) //updates it when done button pressed
{
	var index = validate(req.session.id, business);	
	if(index !== -1)
	{
		var info = JSON.parse(req.body.info);
		business[index].details = info; //are the exact same object so copying over should be fine
		res.send();
	}
	else
	{
		res.send("-1");
	}
});

router.post('/addRoom.json', function(req, res) //updates it when done button pressed
{
	var newRoom = req.body.room;
	if(index !== -1)
	{
		
	}
	else
	{
		res.send("-1");
	}
});

router.get('/search.json', function(req, res)
{
	var searchQueries = req.body.queries; //search words
	var searchFilters = req.body.filters; //search filters
	
	req.pool.getConnection(function(err,connection) 
	{ 
		if (err)  
			throw err;
		var sql;// = "SELECT * from businesses WHERE ='"++"'"; 
		console.log(sql);
		connection.query(sql, function(err, results)
		{ 
			/*Some actions to handle the query results*/
			connection.release(); // release connection
			console.log(results);
		}); 
	});

	res.send(JSON.stringify(results)); //sends the compiled results
});

/// bookings ///

router.post('/userBookings.json', function(req, res)
{
	if(index !== -1)
	{
		var toString = business[index].bookings; //sends bookings
		res.send(toString);
	}
	else
	{
		res.send("-1");
	}
});

/// reviews and mappage//// 

var fs = require('fs');
var reviews = [];

fs.readFile('data/reviews.json', 'utf8', function(err, data) { 
    reviews = JSON.parse(data);
});

router.get('/reviews.json', function(req, res) {
    res.send(JSON.stringify(reviews));
});

router.post('/addReview.json', function(req, res) {
    console.log(req.body);
    reviews.push({name: req.body.name, date: req.body.date, text: req.body.text});
    res.send();
});

var fs = require('fs');

router.post('/hotels.json', function(req, res) 
{
	var search = req.body;
	req.pool.getConnection(function(err,connection) 
	{ 
		if (err)  
			throw err;
		var sql = "SELECT * from businesses WHERE name LIKE '"+search.query+"'"; 
		console.log(sql);
		connection.query(sql, function(err, results)
		{ 
			/*Some actions to handle the query results*/
			connection.release(); // release connection
			console.log(results);
		}); 
	});


    //get the query results and send back
    res.send();
});

module.exports = router;