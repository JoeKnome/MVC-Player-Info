"use strict";

$(document).ready(function() {
	function handleError(message) {
        $("#errorMessage").text(message);
	}
	
	function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
	
	
    $("#signupSubmit").on("click", function(e) {
        e.preventDefault();
        
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }
        
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", function(e) {
        e.preventDefault();
        
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
	
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
	
	$("#playerSubmit").on("click", function(e) {
		if($("#playerName").val() == '') {
            handleError("Enter a new player name");
            return false;
        }

        sendAjax($("#playerForm").attr("action"), $("#playerForm").serialize());
        
        return false;
	});
});