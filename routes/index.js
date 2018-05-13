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
	bookings:[],
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
	rooms:[],
	address:"No",
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
var tempSession = [];
var sessions = {};


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
	console.log(JSON.stringify(req.body));

	var tempUser = req.body;

	for (var i = 0; i < user.length; i++) 
	{
		if(tempUser.email === user[i].email && tempUser.password === user[i].password)
		{

			user[i].currId = req.session.id; //setting currID. 
			tempSession[req.session.id] = req.body.email;
                login = req.body.email
		        res.json({email:login});  
		}else if (tempUser.idtoken !== undefined){
			console.log("Google Token Received");

			async function verify(){
				const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: CLIENT_ID
        });
   	     const payload = ticket.getPayload();
   	     var email = payload['email'];
   	     var name = payload['given_name'];
   	     const userid = payload['sub'];

   	     
   	     for(var i = 0; i < user.length; i++){
   		  if(user[i].email === email && user[i].personalInfo.fName === name){
   		  	tempSession[req.session.id] = user[i].email; 
            login = user[i].email;
   		}
   	}
       res.json({email:login});
   	}verify().catch(console.error);
  } else if(tempSession[req.session.id] !== undefined){
  	    console.log("valid session");
    	login = tempSession[req.session.id];
    	res.json({email:login})
  }

}

});

router.post('/signup.json', function(req, res)
{
	var givenCredentials = req.body;
	var accountFound = false;

	for (var i = 0; i < user.length; i++) 
	{
		if(givenCredentials.email === user[i].email)
		{
			accountFound = true;
		}
	}

	if(accountFound === false)
	{
		var fullName = givenCredentials.fullName.split(" ");
		var firstName;
		for (i = 0; i < fullName.length-1; i++)
		{
			firstName = firstName + fullName[i];
		}
		var newUser =
		{
			email:givenCredentials.email,
			password:givenCredentials.password,
			localCurr:"AUD",
			currId:req.sesion.id, //sets new user's session id to the current one
			bookings:[],
			personalInfo: 
			{
				gender:"",
				first:firstName, //gotten firstname previously in for loop
				surname:fullName[fullName.length-1], //gets surname as it is last token of the string
				postcode:"",
				city:"",
				Country:""
			},
			paymentInfo:
			{
				card:"",
				cardNo:"",
				expiryM:"",
				expiryY:""
			}	
		};

		user.push(newUser);
	}

	console.log("Added User");
    res.redirect('index.html');
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
		res.redirect('index.html');
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
		res.redirect('index.html');
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
		res.redirect('index.html');
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
		res.redirect('index.html');
	}
	
});//********************************************************************************************

router.post('/currency.json', function(req, res) //handles the changing of local currency
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
});

router.post('/populateBookings.json', function(req, res) //should be called when user enters view manage bookings
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

router.post('/viewBooking.json', function(req, res) //should come from pressing [i] on user view manage bookings
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
		res.redirect('index.html');
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
		res.redirect('index.html');
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
		res.redirect('index.html');
	}
});

router.post('/PaymentInfo.json', function(req, res) //gives payment info
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
		res.redirect('index.html');
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
		res.redirect('index.html');
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
		res.redirect('index.html');
	}
});

router.get('/search.json', function(req, res)
{
	var searchQueries = req.body.queries; //search words
	var searchFilters = req.body.filters; //search filters
	var results = [];

	var ratings = false;
	var amenities = true; //is true as if one anemity doesnt match then it becomes false
	var roomType = false;
	var priceBelow = false;

	var nameMatch = false;
	var titleMatch = false;
	var suburbMatch = false;
	var cityMatch = false;

	for (var i = 0; i < business.length; i++) //searches all businesses
	{
		for (var j = 0; j < business[i].rooms.length; j++)  //searches all rooms for each business
		{
			var currBusiness = business[i];
			var currRoom = business[i].rooms[j];

			if(currBusiness.numRatings >= searchFilters.ratings) //ratings inside limit
				ratings = true;

			for (var a = 0; a < currBusiness.anemities.length; a++)//will make anemities false if it doesn't match with given anemities
			{ 
				if(currBusiness.anemities[a] !== searchFilters.anemities[a])
					amenities = false;
			}
			if(currRoom.type === searchFilters.roomType) //if the type is the same, then roomType is correct
				roomType = true;
			if(currRoom.priceBelow >= searchFilters.priceLimit) //if the price limit is below or equal then it is below the price limit
				priceBelow = true;

			for(var q = 0; q < searchQueries.length; q++)
			{
				if(currRoom.title.includes(searchQueries[q]) === true) //room matching title
					titleMatch = true;
				if(currBusiness.name.includes(searchQueries[q]) === true) //if just one of the business descriptions is true after passing the previous tests, then we will add the room
					nameMatch = true;				
				else if(currBusiness.suburb.includes(searchQueries[q]) === true)
					suburbMatch = true;
				else if(currBusiness.city.includes(searchQueries[q]) === true)
					cityMatch = true;
			}

			if(ratings === true && amenities === true && roomType === true && priceBelow === true)
			{
				if(titleMatch === true) //will add room if the title matches
					results.push(currRoom);
				else if(nameMatch === true || suburbMatch === true || cityMatch === true) //or will add the room if the name, suburb or city matches
					results.push(currRoom);
			}			
		}
	}

	res.send(JSON.stringify(results)); //sends the compiled results
});

/// bookings ///

router.post('/userBookings.json', function(req, res)
{
	var index = validate(req.session.id, business);	
	if(index !== -1)
	{
		var toString = business[index].bookings; //sends bookings
		res.send(toString);
	}
	else
	{
		res.redirect('index.html');
	}
});

/// reviews //// 

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

module.exports = router;




