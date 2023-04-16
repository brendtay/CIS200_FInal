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
        });
    
        console.log(data);
     
        return false; // Don't remove this line.
    });
});