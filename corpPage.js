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
	var popup = document.createElement('div');

	popup.className = edit;
}