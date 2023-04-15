function reloadUsers() {

    // Remove/clean all rows in the table
    $("#usersTable tbody tr").remove();

    $.get("/api/users", function (data) {


    });
}

$(document).ready(function () {

    // Every time you open the webpage, 
    // the browser will retrieve the users from
    // the backend and update the table
    reloadUsers();

    $("#btnClear").click(function () {
        $("#userId").val("");
        $("#userName").val("");
        $("#userEmail").val("");
    })

    $("form").submit(function () {

        const id = $("#userId").val();
        const name = $("#userName").val();
        const email = $("#userEmail").val();

        console.log(id + "," + name + "," + email);

        // Everytime you save a new user,
        // the user's table will be refreshed
        reloadUsers();

        return false; // Don't remove this line.
    });
});