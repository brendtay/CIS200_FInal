
$(document).ready(function () {

    // Every time you open the webpage, 
    // the browser will retrieve the users from
    // the backend and update the table
    $("form").submit(function () {

        const data = {
            name: $("#userName").val(),
            email:  $("#userEmail").val()
        }

        // Set a cookie with the "name" value that expires in 1 day
        document.cookie = "name=" + data.name + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";

        //const id = "12345"; // Placeholder value for demonstration

        //document.cookie = "userId=" + id + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";


        $.post("/api/users/login", data, function(response){
            console.log("Server response:", response); 
            // Handle the response data
            if (response.success) {
                window.location.href='order.html';
                console.log("Login successful");
            } else {
                // Login is not successful, do something else
                console.log("Login not successful");
                window.location.href='index.html';
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Handle error response
            console.error("Failed to submit form:", textStatus);
        });


        console.log(data);

        return false; // Don't remove this line.

       
    });

    $("#CreateAccount").click(function () {  //Takes the user to the order webpage when clicked 
        window.location.href='createAccount.html';
    })
});