// functions for editing profile data
"use strict";

$(document).ready(function() {	
	// toggles the player edit form
	$("#editPlayerBut").on("click", function(e) {
		e.preventDefault();

		if(document.querySelector("#editPlayer").style.display == "block") {
			document.querySelector("#editPlayerBut").textContent = "Edit Player";
			document.querySelector("#editPlayer").style.display = "none";
		}
		
		else {
			document.querySelector("#editPlayerBut").textContent = "Hide Editor";
			document.querySelector("#editPlayer").style.display = "block";
		}
	});
	
	// submits a change to player data
	$("#playerSubmit").on("click", function(e) {
		if($("#playerName").val() == '') {
            handleError("Enter a new player name");
            return false;
        }

        sendAjax($("#playerForm").attr("action"), $("#playerForm").serialize());
        
        return false;
	});
});
	