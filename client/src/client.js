// general functions that all pages will use
"use strict";

// sends an AJAX request to the server
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

// displays errors and feedback on page
function handleError(message) {
	console.log(message);
    $("#errorMessage").text(message);
}