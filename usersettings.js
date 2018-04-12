function addRoom()
{
    var newRoom = document.createElement('div');

    newRoom.className = 'room';

    newRoom.innerHTML = '<button class="removeRoom" onclick="removeRoom()">X</button>\
		 <div class="roomTitle">Room Name</div>\
		 <div class="roomPrice">$</div>\
		 <button class="info" onclick="editRoom()">i</button>';

    document.getElementsByClassName('rooms')[0].appendChild(newRoom);
}

function removeRoom() 
{
	var room = document.getElementsByClassName('room')[0];
	room.parentNode.removeChild(room);
}

function editRoom()
{
	var edit = document.createElement('div');
	document.body.appendChild(edit);

	edit.id = 'edit';

	edit.innerHTML = `
			<div id="editBackground"></div>
			<div class="editBox">			

				<div class="editBoxTitle">View Room Details</div>

				<label id="editRoomTitleLabel" class="editBoxInput">Room Title</label>
				<label id="editRoomTitle" class="editBoxInput"></label>
				<br>

				<label id="editRoomDescriptionLabel" class="editBoxInput">Description</label>
				<label id="editRoomDescription" class="editBoxInput"></label>
				<br>				<br>				<br>				<br>

				<label id="editRoomPriceLabel" class="editBoxInput">Price/day</label>
				<label id="editRoomPrice" class="editBoxInput">0 AUD</label>	
				<br>

				<label id="editRoomTitleLabel" class="editBoxInput">Room Type</label>
				<label id="editRoomTitle" class="editBoxInput">Standard</label>	
				<br>

				<label id="editRoomPriceLabel" class="editBoxInput">Guest No.</label>
				<label id="editRoomPrice" class="editBoxInput">0</label>	
				<br>

				<button id="Done" class="button" onclick="closeEdit()">Done</button>	
				<br>
			</div>`;



		document.getElementById('editBackground').addEventListener('click', function() 
        {
            var edit = document.getElementById('edit');
			edit.parentNode.removeChild(edit);
        });

		document.getElementById("editRoomTitle").value = "woo"; 
		document.getElementById("editRoomDescription").value = "woo1"; 		
		document.getElementById("editRoomCurrency").value = "Australia Dollars - AUD"
		document.getElementById("editRoomPrice").value = "10"; 
}

function closeEdit()
{
	var edit = document.getElementById('edit');
	edit.parentNode.removeChild(edit);
}