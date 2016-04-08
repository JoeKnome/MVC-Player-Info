// functions for account management
"use strict";

$(document).ready(function() {
	// submits new user signup form
	$("#signupSubmit").on("click", function(e) {
        e.preventDefault();
        
		// checks for all fields filled
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }
        
		// checks for mathcing passwords
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

	// submits login request
    $("#loginSubmit").on("click", function(e) {
        e.preventDefault();
        
		// checks for all fields filled
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});