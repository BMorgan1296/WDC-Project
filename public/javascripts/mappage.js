//navigation bar//
function openNav() {
    document.getElementById("filter_nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("filter_nav").style.width = "0";
}
//slider
var slider = document.getElementById("Range");
var output = document.getElementById("price");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};
//dropdown on the side navigation
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
} 




var x, i, j, sel, newdiv, optndiv, optn_item;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  sel = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  newdiv = document.createElement("DIV");
  newdiv.setAttribute("class", "select-selected");
  newdiv.innerHTML = sel.options[sel.selectedIndex].innerHTML;
  x[i].appendChild(newdiv);
  /*for each element, create a new DIV that will contain the option list:*/
  optndiv = document.createElement("DIV");
  optndiv.setAttribute("class", "select-items select-hide");
  for (j = 1; j < sel.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    optn_item = document.createElement("DIV");
    optn_item.innerHTML = sel.options[j].innerHTML;
    optn_item.addEventListener("click", function(d) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var i, select, pre;
        select = this.parentNode.parentNode.getElementsByTagName("select")[0];
        pre = this.parentNode.previousSibling;
        for (i = 0; i < select.length; i++) {
          if (select.options[i].innerHTML == this.innerHTML) {
            select.selectedIndex = i;
            pre.innerHTML = this.innerHTML;
            break;
          }
        }
        pre.click();
    });
    
    optndiv.appendChild(optn_item);
  }
  x[i].appendChild(optndiv);
  newdiv.addEventListener("click", function(d) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      d.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
    });
}

function closeAllSelect(room_options) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var sel_itm, sel_Sel, i, arr_room = [];
  sel_itm = document.getElementsByClassName("select-items");
  sel_Sel = document.getElementsByClassName("select-selected");
  for (i = 0; i < sel_Sel.length; i++) {
    if (room_options == sel_Sel[i]) {
      arr_room.push(i);
    }
  }
  for (i = 0; i < sel_itm.length; i++) {
    if (arr_room.indexOf(i)) {
      sel_itm[i].classList.add("select-hide");
    }
  }
}