let id = 0;
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

        $.post("/api/users/login", data, function(response){
            console.log("Server response:", response); 
            // Handle the response data
            if (response.success) {
                // Login is successful
                const id = response.id;
                const zipCode = response.zipCode;
                
                //Stores the user's id in a cookie
                document.cookie = "userId=" + id + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";
                //Stores the user's zipcode in a cookie
                document.cookie = "userZip=" + zipCode + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";
                console.log("The 'userZip' cookie has a value of: " + zipCode);
                console.log("The 'userId' cookie has a id of: " + id);
                window.location.href='order.html';
            } else {
                //Login is not successful
                console.log("Login not successful");
                $('#btnSave').removeClass('btn-success').addClass('btn-danger')
                $("#btnSave").text("Login not successful please try again");
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