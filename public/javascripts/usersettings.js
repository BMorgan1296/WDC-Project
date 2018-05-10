/*jshint unused:false*/
/*exported addRoom*/
/*exported removeRoom*/
/*exported editRoom*/
/*exported closeEdit*/

var counter = 1;

var id;

function addRoom()
{
    var newRoom = document.createElement('div');

    newRoom.className = 'room';

    newRoom.innerHTML = `    		
				<button class="removeRoom" onclick="removeRoom(this)">X</button>
				<div class="roomTitle">Room Name</div>
				<div class="roomCurr">Australia Dollars - AUD</div>
				<div class="roomPrice">0</div>
				<button class="info" onclick="editRoom(this)">i</button>
				`;

    document.getElementsByClassName('rooms')[0].appendChild(newRoom);

	newRoom.id = counter;
	counter = counter + 1;
}

function removeRoom(input) 
{
	var idNum = input.parentNode.getAttribute('id');
	var room = document.getElementById(idNum);
	room.parentNode.removeChild(room);

	counter = counter - 1;
}

function viewRoom(currRoom)
{
	var edit = document.createElement('div');
	document.body.appendChild(edit);

	edit.id = 'edit';

	edit.innerHTML = `
			<div id="editBackground"></div>
			<div class="editBox">			

				<div class="editBoxTitle">View Booking Details</div>

				<label id="editRoomTitleLabel" class="editBoxInput">Room Title</label>
				<label id="editRoomTitle" class="editBoxInput"></label>
				<br>

				<label id="editRoomDescriptionLabel" class="editBoxInput">Booking<br>Details</label>
				<label id="editRoomDescription" class="editBoxInput"></label>
				<br>				<br>				<br>

				<label id="editRoomPriceLabel" class="editBoxInput">Price/day</label>
				<label id="editRoomPrice" class="editBoxInput"></label>	
				<br>

				<label id="editRoomTitleLabel" class="editBoxInput">Room Type</label>
				<label id="editRoomType" class="editBoxInput">Standard</label>	
				<br>

				<label id="editRoomPriceLabel" class="editBoxInput">Guest No.</label>
				<label id="editRoomGuest" class="editBoxInput">1</label>	
				<br>

				<button id="Done" class="button" onclick="closeEdit()">Done</button>	
				<br>
			</div>`;



		document.getElementById('editBackground').addEventListener('click', function() 
        {
            var edit = document.getElementById('edit');
			edit.parentNode.removeChild(edit);
        });

		id = currRoom.parentNode.id; //settings room ID for future use

		document.getElementById("editRoomTitle").innerHTML = currRoom.parentNode.getElementsByClassName('roomTitle')[0].innerHTML; //room title page to popup
		//document.getElementById("editRoomDescription").value = ; //get this from database, it won't show atm 
		document.getElementById("editRoomPrice").innerHTML = currRoom.parentNode.getElementsByClassName('roomPrice')[0].innerHTML;
		document.getElementById("editRoomPrice").innerHTML = currRoom.parentNode.getElementsByClassName('roomPrice')[0].innerHTML; //price comes from database with the currency alongside
		//document.getElementById("editRoomPrice").innerHTML //room guests will come from database
		
}

function closeEdit()
{
	//removing elements
	var edit = document.getElementById('edit');
	edit.parentNode.removeChild(edit);
}