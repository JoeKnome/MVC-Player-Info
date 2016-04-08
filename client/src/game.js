// game logic and server communication
"use strict";

$(document).ready(function() {
	// player win
	$("#win").on("click", function(e){
		e.preventDefault();
		
		// win feedback
		document.querySelector("#game").style.display = "none";
		document.querySelector("#feedback").style.display = "block";
		document.querySelector("#results").textContent = "You won!";
		
		// sends win data to server
		sendAjax("/updateStats", {result: "win", _csrf: $("#token").val()});
	});
	
	// player loss
	$("#lose").on("click", function(e){
		e.preventDefault();
		
		// loss feedback
		document.querySelector("#game").style.display = "none";
		document.querySelector("#feedback").style.display = "block";
		document.querySelector("#results").textContent = "You lost!";
		
		// sends loss data to server
		sendAjax("/updateStats", {result: "lose", _csrf: $("#token").val()});
	});
	
	// restart game
	$("#replay").on("click", function(e){
		e.preventDefault();
		
		// reset UI
		document.querySelector("#feedback").style.display = "none";
		document.querySelector("#game").style.display = "block";
		
		document.querySelector("#errorMessage").textContent = "";
	});
});