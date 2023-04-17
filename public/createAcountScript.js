$(document).ready(function () {

    // Every time you open the webpage, 
    // the browser will retrieve the users from
    // the backend and update the table
    $("form").submit(function () {

        const data = {
            name: $("#userName").val(),
            email:  $("#userEmail").val()
        }

        $.post("/api/users", data, function(data){
           console.log("done"); 
           window.location.href='index.html';
        })
         .fail(function(jqXHR, textStatus, errorThrown) {
             // Handle error response
             if (jqXHR.status === 409) {
                 // If response has a 409 status code, handle user already exists
                 console.error("User already exists");
                 $('#btnSave').removeClass('btn-success').addClass('btn-danger')


                
             } else {
                 // Handle other error status codes
                 console.error("Failed to add user");
             }
         });

        console.log(data);

        $("#btnSave").click(function () {  //Takes the user to the order webpage when clicked 
            window.location.href='order.html';
        })
        $("#login").click(function () {  //Takes the user to the order webpage when clicked 
            window.location.href='order.html';
        })

     
        return false; // Don't remove this line.

       
    });
        $("#btnSave").click(function () {  //Takes the user to the order webpage when clicked 
            window.location.href='order.html';
        })
        $("#login").click(function () {  //Takes the user to the order webpage when clicked 
            window.location.href='login.html';
        })

});